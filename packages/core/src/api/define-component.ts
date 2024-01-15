import render from './render';
import { compose, required, matchesPattern, shouldThrow, withMessage } from '@tybalt/validator';
import { standard } from '@tybalt/parser';
import { derive, reactive } from '@tybalt/reactive';

import { toKebabCase } from 'js-convert-case';

import type { Reactive } from '@tybalt/reactive';

import ContextEvent from './context-event';

import type { DefineComponentsOptions, SetupContext } from '../types';

const nameValidator = shouldThrow(
    withMessage(
        compose(required(), matchesPattern(/.*-.*/)),
        `web component names are required and must contain a hyphen`,
    ),
);

export default ({
    name,
    emits,
    props = {},
    setup,
    connectedCallback,
    disconnectedCallback,
    adoptedCallback,
    render: passedRender,
    shadowMode = 'open',
    css,
    template,
    contexts = [],
}: DefineComponentsOptions) => {
    nameValidator.validate(name);

    const clazz = class extends HTMLElement {
        // Closed shadow roots aren't attached to the class instance by default, so we
        // grab a reference to it ourselves for later use.
        #shadowRoot: ShadowRoot;

        // The context object passed to the component definition's setup method
        #setupContext: SetupContext;

        // A hash from the attribute name to its corresponding reactive and parser
        #props: {
            [Property: string]: {
                reactive: Reactive<any>;
                parser: { parse(str: string | null): any };
                value: any;
            };
        } = {};

        // A hash from the render state key to its corresponding reactive (returned from the setup method)
        #renderState: Map<string, Reactive<any>> = new Map();

        // The render method from the component definition
        #render = passedRender;

        // The css string or function from the component definition
        #css = css;

        // The template string from the component definition
        #template = template;

        // Whether or not the component is currently connected to the dom
        #isConnected = false;

        // All of the contexts to connect to
        // https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md
        #contexts = new Map<string, { reactive: Reactive<any>; unsubscribe?: () => void }>();
        contextState: any = undefined;

        constructor() {
            super();

            this.#props = Object.entries(props).reduce(
                (accumulator, [key, value]) => {
                    const parser = value.parser || standard;

                    let initialValue: any = null;
                    try {
                        initialValue = parser.parse(value.default);
                    } catch (e) {
                        initialValue = e;
                    }

                    const entry = {
                        reactive: reactive(initialValue),
                        parser: value.parser || standard,
                        value: initialValue,
                    };
                    entry.reactive.addListener((value: any) => (entry.value = value));

                    accumulator[key] = entry;

                    return accumulator;
                },
                {} as {
                    [Property: string]: {
                        reactive: Reactive<any>;
                        parser: { parse(str: string | null): any };
                        value: any;
                    };
                },
            );

            for (const [contextName, context] of Object.entries(contexts)) {
                const contextReactive = reactive(context.initialValue);

                this.dispatchEvent(
                    new ContextEvent(
                        context,
                        (value, unsubscribe) => {
                            const contextState = this.#contexts.get(context) || {
                                value: undefined,
                                unsubscribe: undefined,
                            };

                            // Call the old unsubscribe callback if the unsubscribe call has
                            // changed. This probably means we have a new provider.
                            if (unsubscribe !== contextState.unsubscribe) {
                                contextState.unsubscribe?.();
                            }

                            contextReactive.value = value;

                            this.#contexts.set(contextName, { unsubscribe, reactive: contextReactive });
                        },
                        {
                            subscribe: true,
                        },
                    ),
                );

                this.#contexts.set(contextName, { reactive: contextReactive });

                /**
                 * We want to make prop values and contexts available in the render function without needing to
                 * pass them in the setup function. We don't want to shadow them if the dev wants to
                 * reuse derived state with the same name in their render function or template.
                 */
                if (!this.#props[contextName]) {
                    this.#renderState.set(contextName, contextReactive);
                } else {
                    /**
                     * DBW 12/6/23: I would prefer to throw here, but I can't catch the error and I can catch the log line
                     * in the unit tests, so we log because its what we can test 🤣.
                     */
                    console.warn(`Collision detected between context and prop: ${contextName}`);
                }
            }

            // This is the method for clients to use to emit events
            const emit = (type: string, detail: any) => {
                if (emits && !emits?.includes(type)) {
                    console.warn(`unexpected event emitted with type ${type} and detail ${detail}`);
                }
                this.dispatchEvent(new CustomEvent(type, { detail }));
            };

            this.#setupContext = {
                emit,
            };

            const propsForSetup: { [key: string]: { subscribe: () => void; reactive: Reactive<any> } } =
                Object.fromEntries([
                    ...Object.entries(this.#props).map(([key, value]) => [key, value.reactive]),
                    ...Array.from(this.#contexts.entries()).map(([key, value]) => [key, value.reactive]),
                ]);

            const setupResults = setup?.call(this, propsForSetup, this.#setupContext) || {};

            for (const [key, value] of Object.entries({ ...propsForSetup, ...setupResults })) {
                if (value.addListener) {
                    this.#renderState.set(key, value);
                } else if (typeof value === 'function') {
                    this.#renderState.set(key, value);
                } else {
                    this.#renderState.set(key, reactive(value));
                }
            }

            for (const [attributeName, propValue] of Object.entries(this.#props)) {
                if (!this.#renderState.get(attributeName)) {
                    const parsedReactive = derive(propValue.reactive, ([newValue]: Reactive<string>[]) => {
                        return propValue.parser.parse(newValue.value);
                    });
                    this.#renderState.set(attributeName, parsedReactive);
                }
            }

            /**
             * We don't support web components that don't use the shadow dom, and I don't think we ever
             * should. We would have to get away from the template tag method of rendering, and that is
             * contrary to the "use the platform" ethos we're building on.
             */
            this.#shadowRoot = this.attachShadow({ mode: shadowMode });

            this.#doRender();
        }

        connectedCallback() {
            this.#isConnected = true;
            connectedCallback?.apply(this);

            this.#updateProps();
            this.#doRender();
        }

        disconnectedCallback() {
            this.#isConnected = false;

            disconnectedCallback?.apply(this);

            for (const context of this.#contexts.values()) {
                context.unsubscribe?.();
            }
        }

        adoptedCallback() {
            adoptedCallback?.apply(this);
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            const entry = this.#props[name];
            const parsed = entry.parser.parse(newValue);
            entry.reactive.value = parsed;

            this.#doRender();
        }

        #doRender() {
            if (!this.#isConnected || !this.#shadowRoot) {
                return;
            }

            this.#shadowRoot.innerHTML = '';

            /**
             * Note that the order of the rendered template is always
             *
             *   <shadow-root>
             *     <!-- Our generated styles-->
             *     <style></style>
             *
             *     <!-- The user's styles -->
             *     <style></style>
             *
             *     <!-- The user's render results -->
             *     <render></render>
             *
             *     <!-- The user's template -->
             *     <template></template>
             *   </shadow-root>
             *
             * I'm not particularly certain what the consequences of that ordering is and
             * whether we need to make the order configurable.
             */
            if (this.#css) {
                const styleElement = document.createElement('style');

                /**
                 * dbw 1/4/23: There's a tradeoff between thrash from recalculating styles on every render
                 * because you re-render all the script tags, and the convenience of computed styles in
                 * components. I've opted to allow developers to thrash styles as hard as they want, in case
                 * that turns out to be a good idea (it seems conceivable, for instance, that your leaf
                 * components can change computed styles on every render inexpensively because they're in
                 * the shadow dom), but to use documentation to lean towards a "css in a separate file"
                 * approach that discourages its use.
                 */
                const calculatedCss = typeof css === 'function' ? css(this.#renderState) || '' : css;
                styleElement.innerHTML = calculatedCss || '';

                this.#shadowRoot?.appendChild(styleElement);
            }

            if (this.#render) {
                const renderResults = this.#render(Object.fromEntries(this.#renderState));

                let renderedNodes;
                if (renderResults) {
                    renderedNodes = render(renderResults);
                } else {
                    renderedNodes = [];
                }

                for (let i = 0; i < renderedNodes.length; i++) {
                    try {
                        this.#shadowRoot?.appendChild(renderedNodes[i]);
                    } catch (e) {
                        console.error(e);
                    }
                }

                for (let i = 0; i < renderedNodes.length; i++) {
                    try {
                        const childNode = renderedNodes[i];
                        this.#shadowRoot?.appendChild(childNode);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            if (this.#template) {
                const templateElement = document.createElement('template');
                templateElement.innerHTML = this.#template;
                const templateContent = templateElement.content;

                this.#shadowRoot?.appendChild(templateContent.cloneNode(true));
            }

            const renderReactiveListener = () => {
                this.#doRender();
            };

            for (const renderReactive of this.#renderState.values()) {
                if (!renderReactive?.addListener) {
                    continue;
                }

                if (renderReactive.isForcingRerenderOnUpdate) {
                    renderReactive.addListener(renderReactiveListener);
                }
            }
        }

        /**
         * Pushes the current value of all props into their corresponding reactives. Called
         * on connectedCallback.
         */
        #updateProps() {
            for (const [key, value] of Object.entries(this.#props)) {
                const attributeValue = this.getAttribute(toKebabCase(key));
                const usingDefault = attributeValue === null && value.value;
                const areDifferent = attributeValue !== value.value;
                if (!usingDefault && areDifferent) {
                    const nextValue = value.parser.parse(attributeValue);
                    value.reactive.value = nextValue;
                }
            }
        }
    };

    try {
        customElements.define(name, clazz);
    } catch (e) {
        console.warn(`failed to define component ${name}`, e);
    }

    return clazz;
};

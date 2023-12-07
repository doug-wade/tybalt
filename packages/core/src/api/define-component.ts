import render from './render';
import { compose, required, matchesPattern, shouldThrow, withMessage } from '@tybalt/validator';
import { standard } from '@tybalt/parser';
import { BehaviorSubject, Observable, map } from 'rxjs';

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

        // A hash from the attribute name to its corresponding observable and parser
        #props: {
            [Property: string]: { observable: BehaviorSubject<any>; parser: { parse(str: string | null): any } };
        } = {};

        // A hash from the render state key to its corresponding observable (returned from the setup method)
        #renderObservables: { [Property: string]: Observable<any> } = {};

        // The current state for the next render
        #renderState: { [Property: string]: any } = {};

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
        #contexts = new Map<string, { value: any, observable: BehaviorSubject<any>, unsubscribe?: () => void }>();
        contextState: any;

        constructor() {
            super();

            /**
             * Props are a hash from their attribute name to a BehaviorSubject that represents its
             * stream of events. I chose a BehaviorSubject because it makes it easy to access the
             * current value of the prop when setup is called, which makes it easier for end users
             * to work with -- other observables don't have a concept of the "current value" in
             * favor of the push stream, but it seems like a common use case.
             */
            this.#props = Object.entries(props).reduce(
                (accumulator, [key, value]) => {
                    const parser = value.parser || standard;

                    let initialValue = null;
                    try {
                        initialValue = parser.parse(value.default);
                        this.#renderState[key] = initialValue;
                    } catch (e) {
                        initialValue = e;
                    }

                    accumulator[key] = {
                        observable: new BehaviorSubject(initialValue),
                        parser: value.parser || standard,
                    };

                    return accumulator;
                },
                {} as {
                    [Property: string]: {
                        observable: BehaviorSubject<any>;
                        parser: { parse(str: string | null): any };
                    };
                },
            );

            for (const [contextName, context] of Object.entries(contexts)) {
                const observable = new BehaviorSubject(context.initialValue || null);
                this.#contexts.set(contextName, { value: context.initialValue, observable });

                this.dispatchEvent(
                    new ContextEvent(
                        context,
                        (value, unsubscribe) => {
                            const contextState = this.#contexts.get(context) || { value: undefined, unsubscribe: undefined };

                            // Call the old unsubscribe callback if the unsubscribe call has
                            // changed. This probably means we have a new provider.
                            if (unsubscribe !== contextState.unsubscribe) {
                                contextState.unsubscribe?.();
                            }

                            observable.next(value);

                            this.#contexts.set(contextName, { value, unsubscribe, observable });
                        },
                        {
                            subscribe: true,
                        },
                    ),
                );

                /**
                 * We want to make prop values and contexts available in the render function without needing to
                 * pass them in the setup function. We don't want to shadow them if the dev wants to
                 * reuse derived state with the same name in their render function or template.
                 */
                if (!this.#props[contextName]) {
                    this.#renderObservables[contextName] = observable;
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

            const getProxy = (value: { observable: BehaviorSubject<any>; parser?: { parse(str: string | null): any; }; unsubscribe?: () => void }) => {
                return new Proxy(value, {
                    get(target, prop, receiver) {
                        if (prop === 'value') {
                            return target.observable.getValue();
                        }

                        return Reflect.get(target, prop, receiver);
                    }
                });
            };
            
            const propsForSetup: { [key: string]: { subscribe: () => void; observable: Observable<any> } } = Object.fromEntries([
                ...Object.entries(this.#props).map(([key, value]) => [key, getProxy(value)]),
                ...Array.from(this.#contexts.entries()).map(([key, value]) => { return [key, getProxy(value)] }),
            ]);

            const setupResults =
                setup?.call(
                    this,
                    propsForSetup,
                    this.#setupContext,
                ) || {};

            for (const [key, value] of Object.entries({ ...propsForSetup, ...setupResults })) {
                if (value.subscribe) {
                    this.#renderObservables[key] = value;
                } else if (value.observable) {
                    this.#renderObservables[key] = value.observable;
                } else {
                    // We don't ever need to access this a second time, so we can cache it on the
                    // current render state and not have a corresponding render observable.
                    this.#renderState[key] = value;
                }
            }

            for (const [key, value] of Object.entries(this.#props)) {
                if (!this.#renderObservables[key]) {
                    // dbw 7/29/23: We convert the BehaviorSubject to an Observable here because its easier to use
                    // pipes when working with observables, but they convert Subjects to Observables. The general
                    // idea is to be strict in what we pass to clients, and permissive about what we accept, to
                    // make the framework easier to work with.
                    this.#renderObservables[key] = value.observable.pipe(map((value) => value.parser(value)));
                }
            }

            for (const [key, observable] of Object.entries(this.#renderObservables)) {
                observable.subscribe((value) => {
                    this.#renderState[key] = value;
                    this.#doRender();
                });
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
        }

        adoptedCallback() {
            adoptedCallback?.apply(this);
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            const { observable, parser } = this.#props[name];
            const parsed = parser.parse(newValue);
            observable.next(parsed);
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
                const templateElement = document.createElement('template');
                const newEntries = Object.entries(this.#renderState).map(([key, value]) =>
                    [key, value?.observable ? value.observable : value]
                );
                const renderResults = this.#render(Object.fromEntries(newEntries));
                render(renderResults, templateElement);
                const templateContent = templateElement.content;

                this.#shadowRoot?.appendChild(templateContent.cloneNode(true));
            }

            if (this.#template) {
                const templateElement = document.createElement('template');
                templateElement.innerHTML = this.#template;
                const templateContent = templateElement.content;

                this.#shadowRoot?.appendChild(templateContent.cloneNode(true));
            }
        }

        /**
         * Pushes the current value of all props into their corresponding observables. Called
         * on connectedCallback.
         */
        #updateProps() {
            for (const [key, value] of Object.entries(this.#props)) {
                const attributeValue = this.getAttribute(key);
                const usingDefault = attributeValue === null && value.observable.value;
                const areDifferent = attributeValue !== value.observable.getValue();
                if (!usingDefault && areDifferent) {
                    const nextValue = value.parser.parse(attributeValue);
                    value.observable.next(nextValue);
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

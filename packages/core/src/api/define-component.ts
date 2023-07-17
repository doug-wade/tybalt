import { compose, required, matchesPattern, shouldThrow, withMessage } from '@tybalt/validator';
import { BehaviorSubject, Observable } from 'rxjs';

import ContextEvent from './context-event';

import type { DefineComponentsOptions, SetupContext, Context, UnknownContext } from '../types';

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
    render,
    shadowMode = 'closed',
    css,
    template,
    contexts,
}: DefineComponentsOptions) => {
    nameValidator.validate(name);

    const clazz = class extends HTMLElement {
        // The context object passed to the component definition's setup method
        #setupContext: SetupContext;

        // A hash from the attribute name to its corresponding observable
        #props: { [Property: string]: BehaviorSubject<any> };

        // The browser's shadow root
        #shadowRoot: ShadowRoot;

        // A hash from the render state key to its corresponding observable (returned from the setup method)
        #renderObservables: { [Property: string]: Observable<any> } = {};

        // The current state for the next render
        #renderState: { [Property: string]: any } = {};

        // The render method from the component definition
        #render = render;

        // The css string or function from the component definition
        #css = css;

        // The template string from the component definition
        #template = template;

        // Whether or not the component is currently connected to the dom
        #isConnected = false;

        // All of the contexts to connect to
        // https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md
        #contexts = new Map();

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
                    accumulator[key] = new BehaviorSubject(value.default || null);
                    return accumulator;
                },
                {} as { [Property: string]: BehaviorSubject<any> },
            );

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

            const setupResults = setup?.call(this, this.#props, this.#setupContext) || {};

            for (const [key, value] of Object.entries(setupResults)) {
                if (value.subscribe) {
                    this.#renderObservables[key] = value;
                } else {
                    // We don't ever need to access this a second time, so we can cache it on the
                    // current render state and not have a corresponding render observable.
                    this.#renderState[key] = value;
                }
            }

            for (const context of contexts) {
                this.#contexts.set(context, { value: {}, unsubscribe: () => {} });

                const observable = new BehaviorSubject(context.initialValue || null);

                this.dispatchEvent(
                    new ContextEvent(
                        context,
                        (value: UnknownContext, unsubscribe: Function) => {
                            const contextState = this.#contexts.get(context);

                            // Call the old unsubscribe callback if the unsubscribe call has
                            // changed. This probably means we have a new provider.
                            if (unsubscribe !== contextState.unsubscribe) {
                                contextState.unsubscribe.?();
                            }

                            observable.next(value);

                            this.contextState.set(context, { value, unsubscribe, observable });
                        },
                    true // we want this event multiple times (if the logger changes)
                    )
                );
            }

            /**
             * We want to make prop values and contexts available in the render function without needing to
             * pass them in the setup function. We don't want to shadow them if the dev wants to
             * reuse derived state with the same name in their render function or template.
             */
            for (const [key, value] of Object.entries(this.#contexts)) {
                if (!this.#renderObservables[key]) {
                    this.#renderObservables[key] = value.observable;
                }
            }

            for (const [key, value] of Object.entries(this.#props)) {
                if (!this.#renderObservables[key]) {
                    this.#renderObservables[key] = value;
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

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            this.#props[name].next(newValue);

            this.#doRender();
        }

        #doRender() {
            if (!this.#isConnected) {
                return;
            }

            // dbw 12/16/22: We'll definitely need something more sophisticated than this.
            this.#shadowRoot.innerHTML = '';

            /**
             * Note that the order of the rendered template is always
             *
             *   <shadow-root>
             *     <style></style>
             *     <render></render>
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
                styleElement.innerHTML = typeof css === 'function' ? css(this.#renderState) : css;

                this.#shadowRoot.appendChild(styleElement);
            }

            if (this.#render) {
                const templateElement = document.createElement('template');
                templateElement.innerHTML = this.#render(this.#renderState);
                const templateContent = templateElement.content;

                this.#shadowRoot.appendChild(templateContent.cloneNode(true));
            }

            if (this.#template) {
                const templateElement = document.createElement('template');
                templateElement.innerHTML = this.#template;
                const templateContent = templateElement.content;

                this.#shadowRoot.appendChild(templateContent.cloneNode(true));
            }
        }

        /**
         * Pushes the current value of all props into their corresponding observables. Called
         * on connectedCallback.
         */
        #updateProps() {
            for (const [key, value] of Object.entries(this.#props)) {
                const attributeValue = this.getAttribute(key);
                const usingDefault = attributeValue === null && value.value;
                const areDifferent = attributeValue !== value.getValue();
                if (!usingDefault && areDifferent) {
                    value.next(attributeValue);
                }
            }
        }
    };

    customElements.define(name, clazz);

    return clazz;
};

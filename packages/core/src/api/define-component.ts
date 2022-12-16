import useObservable from '../api/use-observable';
import { compose, required, matchesPattern, shouldThrow, withMessage } from '@tybalt/validator';

import type { DefineComponentsOptions, PropsStateMap, SetupContext } from '../types';

const nameValidator = shouldThrow(withMessage(compose(required(), matchesPattern(/.*-.*/)), `web component names are required and must contain a hyphen`));

export default ({ name, emits, props = {}, setup, connectedCallback, disconnectedCallback, adoptedCallback, template, shadowMode = 'closed', css } : DefineComponentsOptions) => {
    nameValidator.validate(name);

    const clazz = class extends HTMLElement {

        #context: SetupContext;
        #props: PropsStateMap;
        #shadowRoot: ShadowRoot;

        constructor() {
            super();
    
            this.#props = Object.entries(props).reduce((accumulator, [key, value]) => {
                return { ...accumulator, [key]: useObservable({ initialValue: value.default, subscriber: value.validator }) };
            }, {});

            const emit = (type: string, detail: any) => {
                if (emits && !emits?.includes(type)) {
                    console.warn(`unexpected event emitted with type ${type} and detail ${detail}`);
                }
                this.dispatchEvent(new CustomEvent(type, { detail }));
            }

            this.#context = {
                emit
            };

            const setupResults = setup?.call(this, this.#props, this.#context);
            const state: Map<string, any> = new Map();

            console.log('got setupResults', setupResults);

            if (setupResults && typeof template === 'function') {
                Object.entries(setupResults).forEach(([key, value]) => {
                    console.log('key', key);
                    
                    console.log('typeof value.observable', value.observable);

                    if (typeof value?.observable?.subscribe === 'function') {
                        console.log('value', value);
                        value.observable.subscribe((val: any) => {
                            state.set(key, val);
                            const newHtml = template(state);

                            console.log('newHtml', newHtml);

                            this.#shadowRoot.innerHTML = newHtml;
                        })
                    } else {
                        state.set(key, value);
                    }
                });
            }

            const templateElement = document.createElement('template');
            templateElement.innerHTML = typeof template === 'function' ? template(state) : template;
            const templateContent = templateElement.content;

            this.#shadowRoot = this.attachShadow({ mode: shadowMode });

            if (css) {
                const styleElement = document.createElement('style');
                styleElement.innerHTML = typeof css === 'function' ? css(state) : css;

                this.#shadowRoot.appendChild(styleElement);
            }

            this.#shadowRoot.appendChild(templateContent.cloneNode(true));
        }

        connectedCallback() {
            connectedCallback?.apply(this);
        }

        disconnectedCallback() {
            disconnectedCallback?.apply(this);
        }

        adoptedCallback() {
            adoptedCallback?.apply(this);
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            this.#props[name].handler(newValue);
        }
    };

    customElements.define(name, clazz);

    return clazz;
};
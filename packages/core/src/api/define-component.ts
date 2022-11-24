import { compose, required, matchesPattern, shouldThrow, withMessage } from '@tybalt/validator';
import Observable from 'zen-observable';

import type { DefineComponentsOptions, PropsStateMap, PropsStateItem, SetupContext } from '../types';

const nameValidator = shouldThrow(withMessage(compose(required(), matchesPattern(/.*-.*/)), `web component names are required and must contain a hyphen`));

export default ({ name, emits, props = {}, setup, connectedCallback, disconnectedCallback, adoptedCallback, template, shadowMode = 'closed', css } : DefineComponentsOptions) => {
    nameValidator.validate(name);

    const clazz = class extends HTMLElement {

        #context: SetupContext;
        #props: PropsStateMap;
        #shadowRoot: ShadowRoot;
        #attributeListeners: Map<string, { element: Element, attributes: string[] }[]>;

        constructor() {
            super();
            
            this.#shadowRoot = this.attachShadow({ mode: shadowMode });

            this.#attributeListeners = new Map();
    
            this.#props = Object.entries(props).reduce((accumulator, [key, value]) => {
                const prop: Partial<PropsStateItem> = {};
                const props = { ...accumulator, [key]: prop };
                prop.observable = new Observable(observer => {
                    prop.observer = observer;
                    if (value.default) {
                        observer.next(value.default);
                    }
                });
                return props;
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
            if (setupResults && typeof template === 'function') {
                Object.entries(setupResults).forEach(([key, value]) => {
                    if (typeof value?.observable?.subscribe === 'function') {
                        value.observable.subscribe((val: any) => {
                            state.set(key, val);
                            this.#shadowRoot.innerHTML = template(state);
                        })
                    } else {
                        state.set(key, value);
                    }
                });
            }

            const templateElement = document.createElement('template');
            templateElement.innerHTML = typeof template === 'function' ? template(state) : template;
            const templateContent = templateElement.content;

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
            this.#props[name].observer.next(newValue);
        }

        #updateAttributes(attributeName: string, attributeValue: any) {
            const elementsToUpdate = this.#attributeListeners.get(attributeName);
            elementsToUpdate?.forEach(element => {
                element.attributes.forEach(attribute => {
                    element.element.setAttribute(attribute, attributeValue);
                });
            });
        }
    };

    customElements.define(name, clazz);

    return clazz;
};
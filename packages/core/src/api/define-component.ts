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
                return { ...accumulator, key: useObservable({ initialValue: value.default, subscriber: value.validator }) };
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

            const closure = setup?.call(this, this.#props, this.#context);

            const templateElement = document.createElement('template');
            templateElement.innerHTML = typeof template === 'function' ? template(closure) : template;
            const templateContent = templateElement.content;

            this.#shadowRoot = this.attachShadow({ mode: shadowMode });

            if (css) {
                const styleElement = document.createElement('style');
                styleElement.innerHTML = typeof css === 'function' ? css(closure) : css;

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
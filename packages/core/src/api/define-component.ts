import { compose, required, matchesPattern, shouldThrow, withMessage } from '@tybalt/validator';
import { BehaviorSubject, Observable } from 'rxjs';

import type { DefineComponentsOptions, SetupContext } from '../types';

const nameValidator = shouldThrow(withMessage(compose(required(), matchesPattern(/.*-.*/)), `web component names are required and must contain a hyphen`));

export default ({ name, emits, props = {}, setup, connectedCallback, disconnectedCallback, adoptedCallback, render, shadowMode = 'closed', css } : DefineComponentsOptions) => {
    nameValidator.validate(name);

    const clazz = class extends HTMLElement {

        #context: SetupContext;
        #props: { [Property: string]: BehaviorSubject<any> };
        #shadowRoot: ShadowRoot;
        #setupResults: { [Property: string]: BehaviorSubject<any> };
        #render = render;
        #css = css;

        constructor() {
            super();
    
            this.#props = Object.entries(props).reduce((accumulator, [key, value]) => {
                accumulator[key] = new BehaviorSubject(value.default || null);
                return accumulator;
            }, {} as { [Property: string]: BehaviorSubject<any> });

            const emit = (type: string, detail: any) => {
                if (emits && !emits?.includes(type)) {
                    console.warn(`unexpected event emitted with type ${type} and detail ${detail}`);
                }
                this.dispatchEvent(new CustomEvent(type, { detail }));
            }

            this.#context = {
                emit
            };

            this.#setupResults = setup?.call(this, this.#props, this.#context) || {};

            for (const [key, value] of Object.entries(this.#props)) {
                if (!this.#setupResults[key]) {
                    this.#setupResults[key] = value;
                }
            }

            this.#shadowRoot = this.attachShadow({ mode: shadowMode });
            
            this.#doRender();
        }

        connectedCallback() {
            connectedCallback?.apply(this);

            this.#updateProps();

            this.#doRender();
        }

        disconnectedCallback() {
            disconnectedCallback?.apply(this);
        }

        adoptedCallback() {
            adoptedCallback?.apply(this);
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            this.#setupResults[name].next(newValue);

            this.#doRender();
        }

        #doRender() {
            // dbw 12/16/22: We'll definitely need something more sophisticated than this.
            this.#shadowRoot.innerHTML = '';

            const state : { [Property: string] : any } = {};
            Object.entries(this.#setupResults).forEach(([key, value]) => {
                const unwrappedValue = value.value ? value.value : value;
                if (!unwrappedValue) {
                    state[key] = "";
                } else {
                    state[key] = unwrappedValue;
                }
            });

            console.log('setupResults', this.#setupResults);
            
            if (this.#css) {
                const styleElement = document.createElement('style');
                styleElement.innerHTML = typeof css === 'function' ? css(state) : css;

                this.#shadowRoot.appendChild(styleElement);
            }

            if (this.#render) {
                const templateElement = document.createElement('template');
                templateElement.innerHTML = this.#render(state);
                const templateContent = templateElement.content;

                this.#shadowRoot.appendChild(templateContent.cloneNode(true));
            }
        }

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
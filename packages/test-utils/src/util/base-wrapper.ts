import getElementName from './get-element-name';
import EmptyWrapper from './empty-wrapper';
import WrapperArray from './wrapper-array';

import type { Wrapper } from '../types';

const isString = (x: string | undefined): x is string => typeof x === 'string';

export default class BaseWrapper implements Wrapper {
    element: Element;
    get length(): Number {
        return 1;
    }

    constructor({ element }: { element: Element }) {
        this.element = element;
    }

    exists() {
        return true;
    }

    html() {
        if (this.element.shadowRoot) {
            const openTag = this.element.outerHTML.split('>')[0].slice(1);
            const closeTagWithCloseBracket = this.element.outerHTML.split('<')[1];
            const closeTag = closeTagWithCloseBracket.slice(0, closeTagWithCloseBracket.length - 1);

            return `<${openTag}>${this.element.shadowRoot.innerHTML}</${closeTag}>`;
        }

        return this.element.outerHTML;
    }

    attributes(attributeName?: string) {
        if (isString(attributeName)) {
            return this.element.getAttribute(attributeName);
        } else {
            const output: { [key: string]: any } = {};
            for (const attr of this.element.attributes) {
                output[attr.name] = attr.value;
            }
            return output;
        }
    }

    text(): string | null {
        return this.element.textContent;
    }

    classes(className?: string) {
        if (isString(className)) {
            return this.element.classList.contains(className);
        } else {
            return [...this.element.classList];
        }
    }

    find(selector: string): Wrapper {
        const element = this.element.querySelector(selector);

        if (!element) {
            return new EmptyWrapper({ selector });
        }

        return new BaseWrapper({ element });
    }

    findAll(selector: string): Wrapper {
        const elements = this.element.querySelectorAll(selector);

        if (!elements.length) {
            return new EmptyWrapper({ selector });
        }

        return new WrapperArray({ elements: Array.from(elements) });
    }

    findComponent(definition: CustomElementConstructor): Wrapper {
        const elementName = getElementName({ definition });
        const element = this.element.querySelector(elementName);

        if (!element) {
            return new EmptyWrapper({ selector: elementName });
        }

        return new BaseWrapper({ element });
    }

    findComponentAll(definition: CustomElementConstructor): Wrapper {
        const elementName = getElementName({ definition });
        const elements = this.element.querySelectorAll(elementName);

        if (!elements.length) {
            return new EmptyWrapper({ selector: elementName });
        }

        return new WrapperArray({ elements: Array.from(elements) });
    }

    trigger(type: string, payload: any): void {
        this.element.dispatchEvent(new CustomEvent(type, { detail: payload }));
    }
};
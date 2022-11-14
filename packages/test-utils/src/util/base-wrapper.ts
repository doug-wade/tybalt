import getElementName from './get-element-name';
import EmptyWrapper from './empty-wrapper';
import WrapperArray from './wrapper-array';

import type { Wrapper } from '../types';

const isString = (x: string | undefined): x is string => typeof x === 'string';

export default class BaseWrapper implements Wrapper {
    element: Element;

    constructor({ element }: { element: Element }) {
        this.element = element;
    }

    exists() {
        return true;
    }

    html() {
        return this.element.outerHTML;
    }

    attributes(attributeName?: string) {
        if (isString(attributeName)) {
            return this.element.getAttribute(attributeName);
        } else {
            return this.element.attributes;
        }
    }

    text(): string | null {
        return this.element.textContent;
    }

    classes(className?: string) {
        if (isString(className)) {
            return this.element.classList.contains(className);
        } else {
            return this.element.classList;
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
};
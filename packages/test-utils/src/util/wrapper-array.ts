// Note: we take a bunch of vars here we don't use because it makes the type system happy.
/* eslint-disable @typescript-eslint/no-unused-vars */

import BaseWrapper from './base-wrapper';
import EmptyWrapper from './empty-wrapper';
import getElementName from './get-element-name';

import type { Wrapper } from '../types';

export default class WrapperArray implements Wrapper {
    elements: Array<Element>;
    get length(): number {
        return this.elements.length;
    }

    constructor({ elements }: { elements: Array<Element> }) {
        this.elements = elements;
    }

    exists() {
        return true;
    }

    find(selector: string): Wrapper {
        let found;

        for (const element of this.elements) {
            found = element.querySelector(selector);
            if (found) {
                break;
            }
        }

        if (found) {
            return new BaseWrapper({ element: found });
        }

        return new EmptyWrapper({ selector });
    }

    findAll(selector: string): Wrapper {
        const elements = this.elements.reduce((accumulator: Array<Element>, element: Element) => {
            return [...accumulator, ...Array.from(element.querySelectorAll(selector))];
        }, []);

        if (elements.length < 1) {
            return new EmptyWrapper({ selector });
        }

        if (elements.length === 1) {
            return new BaseWrapper({ element: elements[0] });
        }

        return new WrapperArray({ elements });
    }

    findComponent(definition: CustomElementConstructor): Wrapper {
        const elementName = getElementName({ definition });

        return this.find(elementName);
    }

    findComponentAll(definition: CustomElementConstructor): Wrapper {
        const elementName = getElementName({ definition });

        return this.findAll(elementName);
    }

    html() {
        const concatenated = this.elements.reduce((accumulator: string, element: Element) => {
            return `${accumulator}${element.outerHTML}\n`;
        }, '');
        return `[\n${concatenated.trim()}\n]`;
    }

    shadowHtml() {
        return this.elements.map((elem) => global.shadowRootRegistry.get(elem));
    }

    text() {
        const concatenated = this.elements.map((element: Element) => element.textContent);
        return `[\n${concatenated.join(',\n')}\n]`;
    }

    setAttribute(name: string, value: any): void {
        this.elements.forEach((element) => {
            element.setAttribute(name, value);
        });
    }

    attributes(attributeName?: string): never {
        throw new Error(`attributes must be called on a single wrapper, use at(i) to access a wrapper`);
    }

    classes(className?: string): never {
        throw new Error(`classes must be called on a single wrapper, use at(i) to access a wrapper`);
    }

    trigger(type?: string, payload?: any): never {
        throw new Error(`trigger must be called on a single wrapper, use at(i) to access a wrapper`);
    }

    emitted(eventName?: string): never {
        throw new Error(`emitted must be called on a single wrapper, use at(i) to access a wrapper`);
    }
}

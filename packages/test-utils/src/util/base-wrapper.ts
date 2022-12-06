import getElementName from './get-element-name';
import EmptyWrapper from './empty-wrapper';
import WrapperArray from './wrapper-array';

import type { Wrapper } from '../types';

const isString = (x: string | undefined): x is string => typeof x === 'string';

const reassignSlot = (element: Element): Element => {
    const slotName = element.getAttribute('name');
    if (!slotName) {
        console.warn('slot missing name');
        return element;
    }

    const slotContent = document.querySelector(`[slot="${slotName}"]`);
    if (!slotContent) {
        console.warn(`no template found matching slot with name ${slotName}`);
        return element;
    }
        
    const clone = slotContent.cloneNode(true) as Element;
    clone.removeAttribute('slot');

    debugger;

    return clone;
}

const stringifyElement = (element: Element): String => {
    if (element.tagName === 'SLOT') {
        element = reassignSlot(element);
    }

    const tagsOnly = element.outerHTML.replace(element.innerHTML, '');
    const [openingTag, closingTag] = tagsOnly.split('>');

    let children = '';
    for (const child of element.childNodes) {
        if (child instanceof Element) {
            children += stringifyElement(child);
        } else {
            children += child.textContent;
        }
    }
    
    return `${openingTag}>${children}${closingTag}>`;
}

const stringifyShadowRoot = (shadowRoot: ShadowRoot): String => {
    return Array.from(shadowRoot.children).reduce((acc, childElement) => {
        return acc + stringifyElement(childElement);
    }, '');
}

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
            const html = this.element.parentElement?.innerHTML || this.element.outerHTML;
            const openTag = html.split('>')[0].slice(1);
            const closeTagWithCloseBracket = html.split('<')[1];
            const closeTag = closeTagWithCloseBracket.slice(0, closeTagWithCloseBracket.length - 1);

            if (this.element.shadowRoot.mode === 'closed') {
                return `<${openTag}></${closeTag}>`
            }

            const results = stringifyShadowRoot(this.element.shadowRoot);

            return `<${openTag}>${results}</${closeTag}>`;
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

        if (element) {
            return new BaseWrapper({ element });;
        }

        if (this.element.shadowRoot) {
            const shadowElement = this.element.shadowRoot.querySelector(selector);

            if (shadowElement) {
                return new BaseWrapper({ element: shadowElement });
            }
        }

        return new EmptyWrapper({ selector });
    }

    findAll(selector: string): Wrapper {
        const elements = Array.from(this.element.querySelectorAll(selector));

        if (this.element.shadowRoot) {
            const shadowElements = Array.from(this.element.shadowRoot.querySelectorAll(selector));

            if (shadowElements) {
                elements.concat(shadowElements);
            }
        }

        if (!elements.length) {
            return new EmptyWrapper({ selector });
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

    trigger(type: string, payload: any): void {
        this.element.dispatchEvent(new CustomEvent(type, { detail: payload }));
    }
};
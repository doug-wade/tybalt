import { beforeAll, describe, expect, it } from '@jest/globals';
import BaseWrapper from '../../src/util/base-wrapper';
import render from '../../src/api/mount';

const OPEN_SHADOW_DOM_COMPONENT_NAME = 'open-shadow-dom';
const CLOSED_SHADOW_DOM_COMPONENT_NAME = 'closed-shadow-dom';
const OPEN_TEMPLATE_COMPONENT_NAME = 'open-template';
const CLOSED_TEMPLATE_COMPONENT_NAME = 'closed-template';
const SHADOW_DOM_TEMPLATE_ID = 'abc123';
const SHADOW_DOM_TEMPLATE_INNER_TEXT = 'hello world';
const SHADOW_DOM_TEMPLATE = `<div id="${SHADOW_DOM_TEMPLATE_ID}">${SHADOW_DOM_TEMPLATE_INNER_TEXT}</div>`;
const SLOT_NAME = 'matt-turner';
const ADDITIONAL_SLOT_CONTENT = '<span>this is additional content</span>';

const makeShadowDomComponent = ({ mode }: { mode: 'open' | 'closed' }) => {
    return class extends HTMLElement {
        #shadow;
        constructor() {
            super();
            this.#shadow = this.attachShadow({ mode });
            this.#shadow.innerHTML = SHADOW_DOM_TEMPLATE;
        }
    };
};

const makeTemplateComponent = ({ mode }: { mode: 'open' | 'closed' }) => {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = `<div><slot name="${SLOT_NAME}"></slot>${ADDITIONAL_SLOT_CONTENT}</div>`;

    return class extends HTMLElement {
        #shadow;
        constructor() {
            super();
            this.#shadow = this.attachShadow({ mode });
            this.#shadow.appendChild(templateElement.content.cloneNode(true));
        }
    };
};

describe('base-wrapper', () => {
    beforeAll(() => {
        customElements.define(OPEN_SHADOW_DOM_COMPONENT_NAME, makeShadowDomComponent({ mode: 'open' }));
        customElements.define(CLOSED_SHADOW_DOM_COMPONENT_NAME, makeShadowDomComponent({ mode: 'closed' }));
        customElements.define(OPEN_TEMPLATE_COMPONENT_NAME, makeTemplateComponent({ mode: 'open' }));
        customElements.define(CLOSED_TEMPLATE_COMPONENT_NAME, makeTemplateComponent({ mode: 'closed' }));
    });

    it('should be able to be instantiated', () => {
        const element = document.createElement('div');

        expect(() => {
            new BaseWrapper({ element });
        }).not.toThrow();
    });

    describe('exists', () => {
        it('should return true', () => {
            const element = document.createElement('div');

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.exists()).toBeTruthy();
        });
    });

    describe('length', () => {
        it('should return one', () => {
            const element = document.createElement('div');

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.length).toBe(1);
        });
    });

    describe('html', () => {
        it('should return innerHTML', () => {
            const mockInnerHTML = '<span>hello world</span>';
            const mockElementName = 'div';
            const element = document.createElement(mockElementName);
            element.innerHTML = mockInnerHTML;

            const actual = new BaseWrapper({ element });

            expect(actual.html()).toBe(`<${mockElementName}>${mockInnerHTML}</${mockElementName}>`);
        });

        it('should include the shadow dom when the mode is open', () => {
            const element = document.createElement(OPEN_SHADOW_DOM_COMPONENT_NAME);

            const actual = new BaseWrapper({ element });

            expect(actual.html()).toBe(
                `<${OPEN_SHADOW_DOM_COMPONENT_NAME}>${SHADOW_DOM_TEMPLATE}</${OPEN_SHADOW_DOM_COMPONENT_NAME}>`,
            );
        });

        it('should include the slotted content for templates when the shadow dom is open', () => {
            const innerHTML = '<span>this is content</span>';
            const slotContent = `<div slot="${SLOT_NAME}">${innerHTML}</div>`;
            const element = document.createElement(OPEN_TEMPLATE_COMPONENT_NAME);
            element.innerHTML = slotContent;
            document.body.appendChild(element);

            const actual = new BaseWrapper({ element });

            expect(actual.html()).toContain(innerHTML);
            expect(actual.html()).toContain(ADDITIONAL_SLOT_CONTENT);
        });

        it('should not include the slotted content for templates when the shadow dom is closed', () => {
            const innerHTML = '<span>this is content</span>';
            const slotContent = `<div slot="${SLOT_NAME}">${innerHTML}</div>`;
            const element = document.createElement(CLOSED_TEMPLATE_COMPONENT_NAME);
            element.innerHTML = slotContent;
            document.body.appendChild(element);

            const actual = new BaseWrapper({ element });

            expect(actual.html()).toContain(slotContent);
            expect(actual.html()).not.toContain(ADDITIONAL_SLOT_CONTENT);
        });

        it('should not include the shadow dom from the .html() method when the mode is closed', () => {
            const element = document.createElement(CLOSED_SHADOW_DOM_COMPONENT_NAME);

            const actual = new BaseWrapper({ element });

            expect(actual.html()).toBe(`<${CLOSED_SHADOW_DOM_COMPONENT_NAME}></${CLOSED_SHADOW_DOM_COMPONENT_NAME}>`);
        });
    });

    describe('shadowHtml', () => {
        // dbw 7/28/23: This takes place in the setup.ts that we vend to clients, but we don't use it ourselves
        // to avoid polluting between tests.
        beforeEach(() => {
            global.shadowRootRegistry = new Map<HTMLElement, ShadowRoot>();
            const originalAttachShadow = HTMLElement.prototype.attachShadow;
            HTMLElement.prototype.attachShadow = function (options) {
                const shadowRoot = originalAttachShadow.apply(this, [options]);
                global.shadowRootRegistry.set(this, shadowRoot);
                return shadowRoot;
            };
        });

        it('should include the shadow dom when the mode is closed', () => {
            const element = document.createElement(CLOSED_SHADOW_DOM_COMPONENT_NAME);

            const actual = new BaseWrapper({ element });

            expect(actual.shadowHtml().innerHTML).toBe(SHADOW_DOM_TEMPLATE);
        });

        it('should include the slotted content for templates when the shadow dom is open', () => {
            const slotContent = `<div slot="${SLOT_NAME}">${ADDITIONAL_SLOT_CONTENT}</div>`;
            const element = document.createElement(OPEN_TEMPLATE_COMPONENT_NAME);
            element.innerHTML = slotContent;
            document.body.appendChild(element);

            const actual = new BaseWrapper({ element });

            expect(
                actual.shadowHtml().querySelector(`slot[name="${SLOT_NAME}"]`).assignedNodes()[0].innerHTML,
            ).toContain(ADDITIONAL_SLOT_CONTENT);
        });

        it('should include the slotted content for templates when the shadow dom is closed', () => {
            const slotContent = `<div slot="${SLOT_NAME}">${ADDITIONAL_SLOT_CONTENT}</div>`;
            const element = document.createElement(CLOSED_TEMPLATE_COMPONENT_NAME);
            element.innerHTML = slotContent;
            document.body.appendChild(element);

            const actual = new BaseWrapper({ element });

            expect(
                actual.shadowHtml().querySelector(`slot[name="${SLOT_NAME}"]`).assignedNodes()[0].innerHTML,
            ).toContain(ADDITIONAL_SLOT_CONTENT);
        });

        it('should include the shadow dom when the mode is closed', () => {
            const element = document.createElement(CLOSED_SHADOW_DOM_COMPONENT_NAME);

            const actual = new BaseWrapper({ element });

            expect(actual.shadowHtml().innerHTML).toBe(SHADOW_DOM_TEMPLATE);
        });
    });

    describe('text', () => {
        it('should return the innerText', () => {
            const mockInnerText = 'hello world';
            const mockElementName = 'div';
            const element = document.createElement(mockElementName);
            element.innerHTML = mockInnerText;

            const actual = new BaseWrapper({ element });

            expect(actual.text()).toBe(mockInnerText);
        });
    });

    describe('attributes', () => {
        it('should return the value of an attribute', () => {
            const mockAttributeName = 'foo';
            const mockAttributeValue = 'bar';
            const element = document.createElement('div');
            element.setAttribute(mockAttributeName, mockAttributeValue);

            const actual = new BaseWrapper({ element });

            expect(actual.attributes(mockAttributeName)).toBe(mockAttributeValue);
        });

        it('should return a hash of attributes when called without arguments', () => {
            const mockAttributes = { foo: 'bar', baz: 'quux' };
            const element = document.createElement('div');
            Object.entries(mockAttributes).forEach(([name, value]) => {
                element.setAttribute(name, value);
            });

            const wrapper = new BaseWrapper({ element });
            const attributes = wrapper.attributes();

            expect(attributes).toEqual(mockAttributes);
        });
    });

    describe('classes', () => {
        it('should indicate whether a class is present', () => {
            const mockClassName = 'foo';
            const element = document.createElement('div');
            element.classList.add(mockClassName);

            const actual = new BaseWrapper({ element });

            expect(actual.classes(mockClassName)).toBeTruthy();
        });

        it('should return an array of classes', () => {
            const mockClassName = 'foo';
            const element = document.createElement('div');
            element.classList.add(mockClassName);

            const actual = new BaseWrapper({ element });

            expect(actual.classes()).toEqual([mockClassName]);
        });
    });

    describe('find', () => {
        it('should return the first match of querySelector', () => {
            const element = document.createElement('div');
            const innerText = 'this is content';
            element.innerHTML = `<span data-jest="my-element">${innerText}</span>`;

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.find('span[data-jest="my-element"]').text()).toBe(innerText);
        });

        it('should return an empty wrapper when the selector is not matched', () => {
            const element = document.createElement('div');

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.find('span[data-jest="my-element"]').exists()).toBeFalsy();
        });

        it('should search the shadow dom', () => {
            const element = document.createElement(OPEN_SHADOW_DOM_COMPONENT_NAME);

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.find(`div[id=${SHADOW_DOM_TEMPLATE_ID}]`).text()).toBe(SHADOW_DOM_TEMPLATE_INNER_TEXT);
        });
    });

    describe('findAll', () => {
        it('should have a findAll method that returns all matches of querySelector', () => {
            const element = document.createElement('div');
            const mockChild = `<span data-jest="my-element"></span>`;
            const times = 3;

            for (let i = 0; i < times; i++) {
                element.innerHTML += mockChild;
            }

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.findAll('span[data-jest="my-element"]').length).toBe(times);
        });

        it('should have a findAll method that returns an empty wrapper when the selector is not matched', () => {
            const element = document.createElement('div');

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.findAll('span[data-jest="my-element"]').exists()).toBeFalsy();
        });
    });

    describe('findComponent', () => {
        it('should match one element', () => {
            const tagName = 'find-component';
            const definition = class extends HTMLElement {};
            global.customElementsReverseRegistry = new Map([[definition, tagName]]);
            const element = document.createElement('div');
            element.innerHTML = `<${tagName}></${tagName}>`;

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.findComponent(definition).exists()).toBeTruthy();
        });

        it('should match no elements', () => {
            const definition = class extends HTMLElement {};
            global.customElementsReverseRegistry = new Map([[definition, 'find-component']]);
            const element = document.createElement('div');

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.findComponent(definition).exists()).toBeFalsy();
        });
    });

    describe('findComponentAll', () => {
        it('should match multiple elements', () => {
            const tagName = 'find-component-all';
            const definition = class extends HTMLElement {};
            global.customElementsReverseRegistry = new Map([[definition, tagName]]);
            const element = document.createElement('div');
            const mockChild = `<${tagName}></${tagName}>`;
            const times = 3;

            for (let i = 0; i < times; i++) {
                element.innerHTML += mockChild;
            }

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.findComponentAll(definition).length).toBe(times);
        });

        it('should match no elements', () => {
            const tagName = 'find-component-all';
            const definition = class extends HTMLElement {};
            global.customElementsReverseRegistry = new Map([[definition, tagName]]);
            const element = document.createElement('div');

            const wrapper = new BaseWrapper({ element });

            expect(wrapper.findComponentAll(definition).exists()).toBeFalsy();
        });
    });

    describe('trigger', () => {
        it('should trigger an event', async () => {
            const mock = jest.fn();
            const eventName = 'click';
            const payload = { foo: 'bar' };
            const element = document.createElement('button');
            element.addEventListener(eventName, mock);

            const wrapper = new BaseWrapper({ element });
            wrapper.trigger(eventName, payload);

            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock.mock.calls[0][0]).toBeInstanceOf(CustomEvent);
            expect(mock.mock.calls[0][0].detail).toBe(payload);
        });
    });
});

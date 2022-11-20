import { beforeAll, describe, expect, it } from '@jest/globals';
import BaseWrapper from '../../src/util/base-wrapper';
import render from '../../src/api/mount';

const OPEN_SHADOW_DOM_COMPONENT_NAME = 'open-shadow-dom';
const CLOSED_SHADOW_DOM_COMPONENT_NAME = 'closed-shadow-dom';
const SHADOW_DOM_TEMPLATE = `<div>hello world</div>`;

const makeShadowDomComponent = ({ mode }: { mode: "open" | "closed" }) => {
    return class extends HTMLElement {
        #shadow;
        constructor() {
            super();
            this.#shadow = this.attachShadow({ mode });
            this.#shadow.innerHTML = SHADOW_DOM_TEMPLATE;
        }
    }
}

describe('base-wrapper', () => {
    beforeAll(() => {
        customElements.define(OPEN_SHADOW_DOM_COMPONENT_NAME, makeShadowDomComponent({ mode: 'open' }));
        customElements.define(CLOSED_SHADOW_DOM_COMPONENT_NAME, makeShadowDomComponent({ mode: 'closed' }));
    });

    it('should be able to be instantiated', () => {
        const element = document.createElement('div');

        expect(() => { new BaseWrapper({ element }); }).not.toThrow();
    });

    it('should return true which exists is called', () => {
        const element = document.createElement('div');

        const wrapper = new BaseWrapper({ element });

        expect(wrapper.exists()).toBeTruthy();
    });

    it('should return a length of one', () => {
        const element = document.createElement('div');

        const wrapper = new BaseWrapper({ element });

        expect(wrapper.length).toBe(1);
    });

    it('should have a .html() method', () => {
        const mockInnerText = 'hello world';
        const mockElementName = 'div';
        const element = document.createElement(mockElementName);
        element.innerHTML = mockInnerText;

        const actual = new BaseWrapper({ element });

        expect(actual.html()).toBe(`<${mockElementName}>${mockInnerText}</${mockElementName}>`);
    });

    it('should include the shadow dom from the .html() method when the mode is open', () => {
        const element = document.createElement(OPEN_SHADOW_DOM_COMPONENT_NAME);

        const actual = new BaseWrapper({ element });

        expect(actual.html()).toBe(`<${OPEN_SHADOW_DOM_COMPONENT_NAME}>${SHADOW_DOM_TEMPLATE}</${OPEN_SHADOW_DOM_COMPONENT_NAME}>`);
    });

    it('should not include the shadow dom from the .html() method when the mode is closed', () => {
        const element = document.createElement(CLOSED_SHADOW_DOM_COMPONENT_NAME);

        const actual = new BaseWrapper({ element });

        expect(actual.html()).toBe(`<${CLOSED_SHADOW_DOM_COMPONENT_NAME}></${CLOSED_SHADOW_DOM_COMPONENT_NAME}>`);
    });

    it('should have a .text() method', () => {
        const mockInnerText = 'hello world';
        const mockElementName = 'div';
        const element = document.createElement(mockElementName);
        element.innerHTML = mockInnerText;

        const actual = new BaseWrapper({ element });

        expect(actual.text()).toBe(mockInnerText);
    });

    it('should have a attributes method that returns the value of an attribute', () => {
        const mockAttributeName = 'foo';
        const mockAttributeValue = 'bar';
        const element = document.createElement('div');
        element.setAttribute(mockAttributeName, mockAttributeValue);

        const actual = new BaseWrapper({ element });

        expect(actual.attributes(mockAttributeName)).toBe(mockAttributeValue);
    });

    it('should have a classes method that indicates whether a class is present', () => {
        const mockClassName = 'foo';
        const element = document.createElement('div');
        element.classList.add(mockClassName);

        const actual = new BaseWrapper({ element });

        expect(actual.classes(mockClassName)).toBeTruthy();
    });

    it('should have a classes method that returns an array of classes', () => {
        const mockClassName = 'foo';
        const element = document.createElement('div');
        element.classList.add(mockClassName);

        const actual = new BaseWrapper({ element });

        expect(actual.classes()).toEqual([ mockClassName ]);
    });

    it('should return a hash of attributes when attributes is called without arguments', () => {
        const mockAttributes = { 'foo': 'bar', 'baz': 'quux' };
        const element = document.createElement('div');
        Object.entries(mockAttributes).forEach(([ name, value ]) => {
            element.setAttribute(name, value);
        });

        const wrapper = new BaseWrapper({ element });
        const attributes = wrapper.attributes();

        expect(attributes).toEqual(mockAttributes);
    });

    it('should have a find method that returns the first match of querySelector', () => {
        const element = document.createElement('div');
        const innerText = 'this is content'
        element.innerHTML = `<span data-jest="my-element">${innerText}</span>`;

        const wrapper = new BaseWrapper({ element });

        expect(wrapper.find('span[data-jest="my-element"]').text()).toBe(innerText);
    });

    it('should have a find method that returns an empty wrapper when the selector is not matched', () => {
        const element = document.createElement('div');

        const wrapper = new BaseWrapper({ element });

        expect(wrapper.find('span[data-jest="my-element"]').exists()).toBeFalsy();
    });

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

    it('should trigger an event', async () => {
        const mock = jest.fn();
        const eventName = 'click';
        const payload = { 'foo': 'bar' };
        const element = document.createElement('button');
        element.addEventListener(eventName, mock);

        const wrapper = new BaseWrapper({ element });
        wrapper.trigger(eventName, payload);

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock.mock.calls[0][0]).toBeInstanceOf(CustomEvent);
        expect(mock.mock.calls[0][0].detail).toBe(payload);
    });
});
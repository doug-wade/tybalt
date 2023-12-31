import { reactive } from "@tybalt/reactive";

import render from "../../src/api/render";
import html from "../../src/api/html";

describe('render', () => {
    it('should attach an event listener', () => {
        const listener = jest.fn();
        const event = new Event('click')
        const template = html`<button type="button" @click="${listener}"></button>`;

        const wrapper = render(template)[0];
        wrapper.dispatchEvent(event);

        expect(listener).toHaveBeenCalledWith(event);
        expect(wrapper.outerHTML).toBe('<button type="button"></button>');
    });

    it('should attach multiple event listeners', () => {
        const blurHandler = jest.fn();
        const changeHandler = jest.fn();
        const blurEvent = new Event('blur');
        const changeEvent = new Event('change');
        const template = html`
            <input 
                type="text" 
                @blur="${blurHandler}" 
                @change="${changeHandler}">
            </input>
        `;

        const wrapper = render(template)[0];
        wrapper.dispatchEvent(blurEvent);
        wrapper.dispatchEvent(changeEvent);

        expect(blurHandler).toHaveBeenCalledWith(blurEvent);
        expect(changeHandler).toHaveBeenCalledWith(changeEvent);
        expect(wrapper.outerHTML).toBe('<input type="text">')
    });

    it('should render a number', () => {
        const number = 42;
        const template = html`<p style="font-size: ${number}px;">hello world</p>`;

        const wrapper = render(template)[0];

        expect(wrapper.outerHTML).toBe('<p style="font-size: 42px;">hello world</p>');
    });

    it('should render an html fragment', () => {
        const fragment = html`<h1>hello world</h1>`;
        const template = html`<div>here's my h1: ${fragment}</div>`;

        const wrapper = render(template)[0];

        expect(wrapper.outerHTML).toBe("<div>here's my h1: <h1>hello world</h1></div>");
    });

    it('should render an array of html fragments', () => {
        const messages = ['foo', 'bar', 'baz'];
        const fragments = messages.map(message => html`<li>${message}</li>`);
        const template = html`<ul>${fragments}</ul>`;

        const wrapper = render(template)[0];

        expect(wrapper.outerHTML).toBe(`<ul>${messages.map(message => `<li>${message}</li>`).join('')}</ul>`);
    });

    it('should render a zero', () => {
        const zero = 0;
        const template = html`<div>${zero}</div>`;

        const wrapper = render(template)[0];

        expect(wrapper.outerHTML).toBe('<div>0</div>');
    });

    it('should return placeholders for setAttribute calls', () => {
        const prefix = 'prefix-';
        const suffix = '-suffix';
        const value = 'hello world';
        const attributeReactive = reactive(value);
        jest.spyOn(attributeReactive, 'addListener');
        
        const template = html`<div my-attribute="prefix-${attributeReactive}-suffix"></div>`;
        const wrapper = render(template)[0];

        expect(wrapper.outerHTML).toBe(`<div my-attribute="${prefix}${value}${suffix}"></div>`);
        expect(attributeReactive.addListener).toHaveBeenCalledTimes(1);
    });

    it('should mark non-set-attribute renders to force re-render', () => {
        const example = reactive('');

        const template = html`<div>${example}</div>`;
        render(template)[0];

        expect(example.isForcingRerenderOnUpdate).toBeTruthy();
    });

    it('should handle multiple attributes', () => {
        const attributeValue = reactive('https://tybalt.org');

        const template = html`<a class="my-class" href="${attributeValue}"></a>`
        const wrapper = render(template)[0];

        expect(wrapper.outerHTML).toBe(`<a class="my-class" href="${attributeValue.value}"></a>`);
    });

    it('should not support multiple interpolations in a single attribute', () => {
        const firstAttributeValue = reactive('bar');
        const secondAttributeValue = reactive('baz');

        const template = html`<div class="foo ${firstAttributeValue} ${secondAttributeValue}"></div>`;

        expect(() => {
            render(template)
        }).toThrow('Tybalt currently only supports one reactive per attribute. Please consolidate.')
    });
});
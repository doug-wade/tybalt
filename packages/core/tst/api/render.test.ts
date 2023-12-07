import render from "../../src/api/render";
import html from "../../src/api/html";

describe('render', () => {
    it('should attach an event listener', () => {
        const listener = jest.fn();
        const event = new Event('click')
        const template = html`<button type="button" @click="${listener}"></button>`;

        const wrapper = render(template)[0];
        wrapper.dispatchEvent(event);

        expect(listener).toBeCalledWith(event);
        expect(wrapper.outerHTML).toBe('<button type="button"></button>')
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
});
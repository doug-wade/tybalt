import render from "../../src/api/render";
import html from "../../src/api/html";

describe('render', () => {
    it('should attach an event listener', () => {
        const listener = jest.fn();
        const wrapper = document.createElement('div');
        const event = new Event('input')
        const template = html`<input type="text" @input="${listener}"></input>`;

        render(template, wrapper);
        const input = wrapper.querySelector('input');
        input?.dispatchEvent(event);

        expect(listener).toBeCalledWith(event);
    });

    it('should render a number', () => {
        const number = 42;
        const wrapper = document.createElement('div');
        const template = html`<p style="font-size: ${number}px;">hello world</p>`;

        render(template, wrapper);

        expect(wrapper.outerHTML).toBe('<div><p style="font-size: 42px;">hello world</p></div>');
    });
});
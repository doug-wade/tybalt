import { describe, it, jest, expect } from '@jest/globals';
import { mount } from '@tybalt/test-utils';
import defineComponent from '../../src/api/define-component';

describe('defineComponent', () => {
    it('calls customElements.define', () => {
        jest.spyOn(customElements, 'define');
        const name = 'calls-define';
        const component = defineComponent({ name });

        expect(customElements.define).toHaveBeenCalledWith(name, component);
    });

    it('creates a web component', async () => {
        const name = 'extends-html-element';
        const component = defineComponent({ name });

        const wrapper = await mount(component);

        expect(wrapper.element).toBeInstanceOf(HTMLElement);
    });

    it('renders a string template', async () => {
        const name = 'renders-string-template';
        const template = `<div>hello world</div>`;
        const component = defineComponent({ name, template, shadowMode: "open" });

        const wrapper = await mount(component);

        expect(wrapper.html()).toBe(`<${name}>${template}</${name}>`);
    });
});
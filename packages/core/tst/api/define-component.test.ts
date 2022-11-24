import { describe, it, jest, expect } from '@jest/globals';
import { flushPromises, mount } from '@tybalt/test-utils';
import Observable from 'zen-observable';
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

    it.only('renders a string template', async () => {
        const name = 'renders-string-template';
        const template = `<div>hello world</div>`;
        const component = defineComponent({ name, template, shadowMode: "open" });

        const wrapper = await mount(component);

        expect(wrapper.html()).toBe(`<${name}>${template}</${name}>`);
    });

    it('adds a style tag with css', async () => {
        const name = 'style-tag';
        const css = '.example { color: rebeccapurple; }';
        const component = defineComponent({ name, css, shadowMode: "open" });

        const wrapper = await mount(component);

        const styleTag = wrapper.find('style');
        expect(styleTag.exists()).toBeTruthy();
        expect(styleTag.text()).toBe(css);
    });

    it('renders named slotted content', async () => {
        const name = 'renders-slot';
        const message = 'Hello World';
        const slotName = "content";
        const template = `<div data-jest="${name}"><slot name="${slotName}"></slot></div>`;
        const slot = `<span slot="${slotName}">${message}</span>`;
        const component = defineComponent({ name, template, shadowMode: "open" });

        const wrapper = await mount(component, { slot });

        await flushPromises();

        expect(wrapper.html()).toContain(message);
    });

    it('converts all props to observables', async () => {
        const name = "props-are-observables";
        const props = { example: {} };

        let underTest;
        const component = defineComponent({ name, props, setup(setupProps) { underTest = setupProps } });
        mount(component);

        expect(underTest.example).toBeTruthy();
        expect(typeof underTest.example.observable.subscribe === 'function').toBeTruthy();
        expect(typeof underTest.example.handler === 'function').toBeTruthy();
    });

    it.only('sets the attributes', async () => {
        const attribute = 'data-attribute';
        const tag = 'div';
        const value = 'value';
        const name = "initial-render";
        
        const component = defineComponent({ 
            name, 
            setup() { 
                return { 
                    foo: Observable.of([value])
                } 
            }, 
            template({ foo }) {
                return `<${tag} ${attribute}="${foo}"></${tag}>`;
            }
        });
        const wrapper = await mount(component);
        const actual = await wrapper.find(tag);

        expect(actual.attributes(attribute)).toBe(value);
    });
});
import { describe, it, jest, expect } from '@jest/globals';
import { flushPromises, mount } from '@tybalt/test-utils';
import { Observable } from 'rxjs';
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

    it('adds a style tag with css', async () => {
        const name = 'style-tag';
        const css = '.example { color: "rebeccapurple"; }';
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
        const component = defineComponent({ name, render() { return template }, shadowMode: "open" });

        const wrapper = await mount(component, { slot });

        await flushPromises();

        expect(wrapper.html()).toContain(message);
    });

    it('converts all props to Observable', async () => {
        const name = "props-are-observables";
        const props = { example: { } };

        let underTest;
        const component = defineComponent({ name, props, setup(setupProps) { underTest = setupProps } });
        mount(component);

        expect(underTest.example).toBeTruthy();
        expect(underTest.example instanceof Observable).toBeTruthy();
    });
});
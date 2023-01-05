import { describe, it, jest, expect } from '@jest/globals';
import { flushPromises, mount } from '@tybalt/test-utils';
import { Observable, map } from 'rxjs';

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
        const component = defineComponent({ name, css, shadowMode: 'open' });

        const wrapper = await mount(component);

        const styleTag = wrapper.find('style');
        expect(styleTag.exists()).toBeTruthy();
        expect(styleTag.text()).toBe(css);
    });

    it('renders named slotted content', async () => {
        const name = 'renders-slot';
        const message = 'Hello World';
        const slotName = 'content';
        const template = `<div data-jest="${name}"><slot name="${slotName}"></slot></div>`;
        const slot = `<span slot="${slotName}">${message}</span>`;
        const component = defineComponent({
            name,
            render() {
                return template;
            },
            shadowMode: 'open',
        });

        const wrapper = await mount(component, { slot });

        await flushPromises();

        expect(wrapper.html()).toContain(message);
    });

    it('converts all props to Observable', async () => {
        const name = 'props-are-observables';
        const props = { example: {} };

        let underTest;
        const component = defineComponent({
            name,
            props,
            setup(setupProps) {
                underTest = setupProps;
            },
        });
        mount(component);

        expect(underTest.example).toBeTruthy();
        expect(underTest.example instanceof Observable).toBeTruthy();
    });

    it('renders a template', async () => {
        const name = 'template-option';
        const template = '<div>hello world</div>';

        const component = defineComponent({
            name,
            template,
            shadowMode: 'open',
        });

        const wrapper = await mount(component);

        expect(wrapper.html()).toBe(`<${name}>${template}</${name}>`);
    });

    it('renders derived state', async () => {
        const name = 'renders-derived-state';
        const value = 'foo';
        const props = { example: { default: value } };
        const deriveState = (x: string): string => `${x}bar`;

        const component = defineComponent({
            name,
            props,
            shadowMode: 'open',
            render({ derived }) {
                return `<div>${derived}</div>`;
            },
            setup({ example }) {
                return {
                    derived: example.pipe(map(deriveState))
                }
            }
        });

        const wrapper = await mount(component);

        expect(wrapper.html()).toContain(deriveState(value));
    });
});

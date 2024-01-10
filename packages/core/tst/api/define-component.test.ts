import { describe, it, jest, expect } from '@jest/globals';
import { flushPromises, mount } from '@tybalt/test-utils';
import { string, standard } from '@tybalt/parser';
import { Reactive, derive, reactive } from '@tybalt/reactive';

import html from '../../src/api/html';
import defineComponent from '../../src/api/define-component';
import { PropsStateMap } from '../../src/types';

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
        const slot = `<span slot="${slotName}">${message}</span>`;
        const component = defineComponent({
            name,
            render() {
                return html`<div data-jest="${name}"><slot name="${slotName}"></slot></div>`;
            },
        });

        const wrapper = await mount(component, { slot });

        await flushPromises();

        expect(wrapper.html()).toContain(message);
    });

    it('converts all props to reactives', async () => {
        const name = 'props-are-reactives';
        const props = {
            one: {},
            two: {
                parser: {
                    parse: () => {
                        return 'world';
                    },
                },
            },
            three: {
                default: 'hello',
                validator: {
                    validate: () => {
                        return true;
                    },
                },
            },
            four: {
                default: 'hello',
                validator: {
                    validate: () => {
                        return true;
                    },
                },
                parser: {
                    parse: () => {
                        return 'world';
                    },
                },
            },
        };

        let underTest;
        const component = defineComponent({
            name,
            props,
            setup(setupProps) {
                underTest = setupProps;
            },
        });

        await mount(component);

        for (const propKey of Object.keys(props)) {
            const prop = underTest[propKey];

            expect(prop.addListener).toBeTruthy();
            if (propKey !== 'one') {
                expect(prop.value).toBeTruthy();
            }
        }
    });

    it('renders a template', async () => {
        const name = 'template-option';
        const template = '<div>hello world</div>';

        const component = defineComponent({
            name,
            template,
        });

        const wrapper = await mount(component);

        expect(wrapper.html()).toBe(`<${name}>${template}</${name}>`);
    });

    it('renders derived state', async () => {
        const value = 'foo';
        const deriveState = ([x]) => `${x}bar`;

        const component = defineComponent({
            name: 'renders-derived-state',
            props: { example: { default: value, parser: string } },
            render({ derived }) {
                return html`<div>${derived}</div>`;
            },
            setup({ example }) {
                const derived = derive(example, deriveState);

                return {
                    derived,
                };
            },
        });

        const wrapper = await mount(component);

        expect(wrapper.shadowHtml()?.textContent).toContain(deriveState([value]));
    });

    it('parses props with a standard parser', async () => {
        const expected = { foo: 'bar' };

        let actual: PropsStateMap = {};
        const component = defineComponent({
            name: 'uses-standard-parser',
            props: {
                example: {
                    parser: standard,
                },
            },
            setup({ example }) {
                actual = example;
            },
        });

        await mount(component, { attributes: { example: expected } });

        expect(actual.value).toStrictEqual(expected);
    });

    it('supports props with a custom parser', async () => {
        const expected = 'marta';
        const parser = {
            parse() {
                return expected;
            },
        };

        let actual: PropsStateMap = { reactive: reactive(null), parse: () => {} };
        const component = defineComponent({
            name: 'uses-custom-parser',
            props: {
                example: { parser },
            },

            setup({ example }) {
                actual = example;
            },
        });

        await mount(component, { attributes: { example: 'true' } });

        expect(actual.value).toBe(expected);
    });

    it('supports returning a reactive from the setup method', async () => {
        const expected = [];

        let actual: PropsStateMap = { reactive: reactive(null), parse: () => {} };
        const component = defineComponent({
            name: 'returns-reactive-from-setup',
            setup() {
                return {
                    example: reactive(expected),
                };
            },
            render({ example }) {
                actual = example;
            },
        });

        await mount(component);

        expect(actual.value).toStrictEqual(expected);
    });

    it('should not wrap event listeners in a reactive', async () => {
        const expected = () => {};

        let actual: PropsStateMap = { reactive: reactive(null), parse: () => {} };
        const component = defineComponent({
            name: 'should-not-wrap-event-listeners',
            setup() {
                return {
                    example: expected,
                };
            },
            render({ example }) {
                actual = example;
            },
        });

        await mount(component);

        expect(actual).toBe(expected);
    });
});

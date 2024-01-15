import { describe, it, expect } from '@jest/globals';
import { mount } from '@tybalt/test-utils';
import defineComponent from '../../src/api/define-component';
import html from '../../src/api/html';
import { reactive } from '@tybalt/reactive';

describe('component rendering', () => {
    it('renders reactives returned from setup', async () => {
        const name = 'template-method';
        const expected = 'bar';

        const component = defineComponent({
            name,
            render({ example }) {
                return html`<span>${example.value}</span>`;
            },
            setup() {
                return { example: reactive(expected) };
            },
        });
        const wrapper = await mount(component);

        expect(wrapper.html()).toContain(expected);
    });

    it('passes props to render without going through setup', async () => {
        const name = 'template-props';
        const expected = 'baz';

        const component = defineComponent({
            name,
            props: { example: { default: expected } },
            render({ example }) {
                return html`<span>${example}</span>`;
            },
        });
        const wrapper = await mount(component);

        expect(wrapper.shadowHtml()?.textContent).toContain(expected);
    });

    it('re-renders when props have changes', async () => {
        const name = 're-render';
        const firstRenderPropValue = 'foo';
        const secondRenderPropValue = 'bar';

        const component = defineComponent({
            name,
            props: { example: { default: firstRenderPropValue } },
            render({ example }) {
                const result = html`<span>${example}</span>`;
                return result;
            },
        });
        const wrapper = await mount(component);

        expect(wrapper.html()).toContain(firstRenderPropValue);

        wrapper.setAttribute('example', secondRenderPropValue);

        expect(wrapper.html()).toContain(secondRenderPropValue);
    });

    it('passes props to children correctly', async () => {
        const name = 'pass-props-to-children';
        const childComponentName = 'child-component';
        const expected = 'expected value';

        let actual;
        defineComponent({
            name: childComponentName,
            props: { nested: {} },
            setup({ nested }) {
                actual = nested;
            },
        });
        const parentComponent = defineComponent({
            name,
            props: { example: {} },
            render({ example }) {
                return html`<${childComponentName} nested="${example}"></${childComponentName}>`;
            },
        });

        await mount(parentComponent, { attributes: { example: expected } });

        expect(actual?.value).toBe(expected);
    });

    it('passes multi-word props to children correctly', async () => {
        const name = 'pass-multi-word-props-to-children';
        const childComponentName = 'multi-word-child-component';
        const expected = 'expected value';

        let actual;
        defineComponent({
            name: childComponentName,
            props: { multiWordProp: {} },
            setup({ multiWordProp }) {
                actual = multiWordProp;
            },
        });
        const parentComponent = defineComponent({
            name,
            props: { multiWordProp: {} },
            render({ multiWordProp }) {
                return html`<${childComponentName} multi-word-prop="${multiWordProp}"></${childComponentName}>`;
            },
        });

        await mount(parentComponent, { attributes: { multiWordProp: expected } });

        expect(actual?.value).toBe(expected);
    });
});

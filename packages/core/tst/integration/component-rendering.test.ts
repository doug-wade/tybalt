import { describe, it, jest, expect } from '@jest/globals';
import { flushPromises, mount } from '@tybalt/test-utils';
import defineComponent from '../../src/api/define-component';
import html from '../../src/api/html';
import { BehaviorSubject } from 'rxjs';

describe('component rendering', () => {
    it('renders observables returned from setup', async () => {
        const name = 'template-method';
        const expected = 'bar';

        const component = defineComponent({
            name,
            shadowMode: 'open',
            render({ expected }) {
                return html`<span>${expected}</span>`;
            },
            setup() {
                return { expected: new BehaviorSubject(expected) };
            },
        });
        const wrapper = await mount(component);

        expect(wrapper.html()).toContain(expected);
    });

    it('passes props to template without going through setup', async () => {
        const name = 'template-props';
        const expected = 'baz';

        const component = defineComponent({
            name,
            shadowMode: 'open',
            props: { example: { default: expected } },
            render({ example }) {
                return html`<span>${example}</span>`;
            },
        });
        const wrapper = await mount(component);

        expect(wrapper.html()).toContain(expected);
    });

    it('re-renders when props have changes', async () => {
        const name = 're-render';
        const firstRenderPropValue = 'foo';
        const secondRenderPropValue = 'bar';

        const component = defineComponent({
            name,
            shadowMode: 'open',
            props: { example: { default: firstRenderPropValue } },
            render({ example }) {
                return html`<span>${example}</span>`;
            },
        });
        const wrapper = await mount(component);

        expect(wrapper.html()).toContain(firstRenderPropValue);

        wrapper.setAttribute('example', secondRenderPropValue);

        expect(wrapper.html()).toContain(secondRenderPropValue);
    });
});

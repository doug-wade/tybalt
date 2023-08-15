import { describe, it, expect } from '@jest/globals';
import { flushPromises, mount } from '@tybalt/test-utils';
import defineComponent from '../../src/api/define-component';
import html from '../../src/api/html';

describe('events', () => {
    it('should be observable via emitted()', async () => {
        const eventName = 'my-event';

        const component = defineComponent({
            name: 'events-all-work-together',
            render({ listener }) {
                return html`<div><button @click="${listener}"></button></div>`;
            },
            setup(_, { emit }) {
                const listener = (evt: Event) => {
                    evt.stopPropagation();

                    emit(eventName);
                }
                return { listener };
            },
        });
        const wrapper = await mount(component);

        const button = wrapper.find('button');
        button.trigger('click');

        expect(wrapper.emitted()).toHaveLength(1);
        expect(wrapper.emitted()[0].type).toBe(eventName);
    });

    it('should trigger re-renders on event changes', async () => {
        const startingValue = 'starting';
        const updatedValue = 'updated';

        const component = defineComponent({
            name: 'events-trigger-rerender',
            props: {
                value: { default: startingValue }
            },
            setup({ value }) {
                const listener = () => {
                    value.value = updatedValue;
                };

                return { value, listener };
            },
            render({ value, listener }) {
                return html`<div>
                    <span>${value}</span>
                    <button @click="${listener}"></button>
                </div>`
            }
        });

        const wrapper = await mount(component);

        expect(wrapper.shadowHtml()?.textContent).toContain(startingValue);
        expect(wrapper.shadowHtml()?.textContent).not.toContain(updatedValue);

        const button = wrapper.find('button');
        button.trigger('click');

        await flushPromises();

        expect(wrapper.shadowHtml()?.textContent).not.toContain(startingValue);
        expect(wrapper.shadowHtml()?.textContent).toContain(updatedValue);
    });
});
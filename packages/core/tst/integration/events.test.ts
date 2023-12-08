import { describe, it, expect } from '@jest/globals';
import { mount } from '@tybalt/test-utils';
import defineComponent from '../../src/api/define-component';
import html from '../../src/api/html';

describe('events', () => {
    it('should all work together', async () => {
        const eventName = 'my-event';

        const component = defineComponent({
            name: 'events-all-work-together',
            render({ listener }) {
                return html`<div><button @click="${listener}"></button></div>`;
            },
            setup(_, { emit }) {
                const listener = (evt) => {
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
});
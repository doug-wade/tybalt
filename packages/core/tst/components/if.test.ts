import '../..';
import { defineComponent, html } from '../..';
import { mount } from '@tybalt/test-utils';

describe('t-if', () => {
    it('renders the then and else options', async () => {
        const SIDES = ['heads', 'tails'];
        const FlipACoin = defineComponent({
            name: 'flip-a-coin',
            shadowMode: 'open',
            props: { side: {} },
            render({ side }) {
                return html`
                    <span>what</span>
                    <t-if condition="${side === SIDES[0]}">
                        <div slot="true">${SIDES[0]}</div>
                        <div slot="false">${SIDES[1]}</div>
                    </t-if>
                `;
            },
        });

        await Promise.all(
            SIDES.map(async (side) => {
                const wrapper = await mount(FlipACoin, { attributes: { side } });

                expect(wrapper.text()).toBe(side);
            }),
        );
    });
});

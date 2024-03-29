import { defineComponent, html } from '../..';
import { mount } from '@tybalt/test-utils';

describe('t-else', () => {
    it('renders the then and else options', async () => {
        const SIDES = ['heads', 'tails'];
        const FlipACoin = defineComponent({
            name: 'flip-a-coin',
            props: { side: {} },
            render({ side }) {
                return html`
                    <t-if condition="${side === SIDES[0]}"> ${SIDES[0]} </t-if>
                    <t-else condition="${side === SIDES[0]}"> ${SIDES[1]} </t-else>
                `;
            },
        });

        await Promise.all(
            SIDES.map(async (side) => {
                const wrapper = await mount(FlipACoin, { attributes: { side } });

                expect(wrapper.shadowHtml()?.textContent).toContain(side);
            }),
        );
    });
});

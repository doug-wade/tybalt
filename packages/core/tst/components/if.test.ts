import { defineComponent, html } from '../..';
import { mount } from '@tybalt/test-utils';

describe('t-if', () => {
    it('renders the then and else options', async () => {
        const SIDES = ['heads', 'tails'];

        const FlipACoin = defineComponent({
            name: 'flip-a-coin',
            props: {
                side: {
                    default: SIDES[0],
                    validator: { validate: (value: string) => SIDES.includes(value) },
                },
            },
            render({ side }) {
                return html`
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

                expect(wrapper.shadowHtml()?.textContent).toContain(side);
            }),
        );
    });
});

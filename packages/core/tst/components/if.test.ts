import { defineComponent, html } from '../..';
import { mount } from '@tybalt/test-utils';

import '../..';

describe('t-switch', () => {
    it('renders the then and else options', () => {
        const SIDES = [ 'heads', 'tails' ];
        const FlipACoin = defineComponent({
            name: 'flip-a-coin',
            props: { side: {} },
            render({ side }) {
                return html`
                    <t-if condition="${side === SIDES[0]}">
                        <div slot="then">${SIDES[0]}</div>
                        <div slot="else">${SIDES[1]}</div>
                    </t-if>
                `;
            }
        });

        SIDES.forEach(async (side) => {
            const wrapper = await mount(FlipACoin, { attributes: { side } });

            expect(wrapper.text()).toBe(side);
        });
    });
});
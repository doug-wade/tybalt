import { defineComponent, html } from '../..';
import { mount } from '@tybalt/test-utils';

describe('t-switch', () => {
    it('renders the first option of three', () => {
        const THREE_SPECIES = [ "tanar'ri", "yugoloth", "baatezu" ];

        const RuleOfThree = defineComponent({
            name: 'rule-of-three',
            props: { species: {} },
            render({ species }) {
                return html`
                    <t-switch value="${species}">
                        <div slot="${THREE_SPECIES[0]}">${THREE_SPECIES[0]}</div>
                        <div slot="${THREE_SPECIES[1]}">${THREE_SPECIES[1]}</div>
                        <div slot="${THREE_SPECIES[2]}">${THREE_SPECIES[2]}</div>
                    </t-switch>
                `;
            }
        });

        THREE_SPECIES.forEach(async (species) => {
            const wrapper = await mount(RuleOfThree, { attributes: { species } });

            expect(wrapper.text()).toBe('');
        });
    });
});
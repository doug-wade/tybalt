import { defineComponent, html } from '..';
import { oneOf } from '@tybalt/validator';

const getSlotName = (condition: string | boolean) => {
    if (condition === 'true' || condition === true) {
        return 'true';
    }
    return 'false';
};

export default defineComponent({
    name: 't-if',

    props: {
        condition: {
            validator: oneOf(['true', 'false', true, false]),
        },
    },
    render({ condition }: { condition: string | boolean }) {
        const slotName = getSlotName(condition);
        return html`<div><slot name="${slotName}"></slot></div>`;
    },
});

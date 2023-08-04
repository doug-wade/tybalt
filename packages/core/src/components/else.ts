import { defineComponent, html } from '..';
import { boolean } from '@tybalt/parser';
import { oneOf } from '@tybalt/validator';

export default defineComponent({
    name: 't-if',
    shadowMode: 'open',
    props: {
        condition: {
            validator: oneOf(['true', 'false']),
            parser: boolean,
        },
    },
    render({ condition }: { condition: boolean }) {
        let slotName;

        if (condition) {
            slotName = 'false';
        } else {
            slotName = 'true';
        }

        return html`<slot name="${slotName}"></slot>`;
    },
});

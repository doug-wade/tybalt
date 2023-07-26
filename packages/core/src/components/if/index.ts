import { defineComponent, html } from '../..';

export default defineComponent({
    name: 't-if',
    shadowMode: 'open',
    render({ condition }: { condition: string }) {
        let slotName;

        if (condition === '' || !condition) {
            slotName = 'false';
        } else {
            slotName = 'true';
        }

        return html`<slot name="${slotName}"></slot>`;
    },
});

import { defineComponent, html } from '../..';

export default defineComponent({
    name: 't-if',
    shadowMode: 'open',
    render({ condition }) {
        let slotName = condition ? 'true' : 'false';
        return html`<slot name="${slotName}"></slot>`
    }
});

import { defineComponent, html } from '../..';

export default defineComponent({
    name: 't-if',
    render({ condition }: { condition: any }) {
        let slotName = condition ? 'then' : 'else';
        return html`<slot name="${slotName}"></slot>`
    }
});
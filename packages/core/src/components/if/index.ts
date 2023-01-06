import { defineComponent, html } from '../..';

export default defineComponent({
    name: 't-if',
    shadowMode: 'open',
    render({ condition }) {
        let slotName = condition ? 'true' : 'false';
        console.log('rendering slot with name', slotName);
        const text = html`<slot name="${slotName}"></slot>`
        console.log('rendered slot with content', text);
        return text;
    }
});

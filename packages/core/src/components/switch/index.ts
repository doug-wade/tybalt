import { defineComponent, html } from '../..';

export default defineComponent({
    name: 't-switch',
    render({ value }) {
        return html`<slot name="${value}"></slot>`
    }
});
import { defineComponent, html } from '../..';

export default defineComponent({
    name: 't-switch',
    render({ value }: { value: any }) {
        return html`<slot name="${value}"></slot>`
    }
});
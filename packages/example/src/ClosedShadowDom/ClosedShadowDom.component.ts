import { defineComponent, html } from '@tybalt/core';

export default defineComponent({
    shadowMode: 'closed',
    name: 'example-closed',
    render() {
        return html`<div class="example-closed">
            <div>this is the div before the slotted content</div>
            <slot></slot>
            <div>this is the div after the slotted content</div>
        </div>`;
    },
});

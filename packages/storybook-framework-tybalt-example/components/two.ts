import { defineComponent, html } from "@tybalt/core";

export default defineComponent({
    name: 'tybalt-two',
    props: {
        prop: { default: 'primary' }
    },
    render({ prop }) {
        return html`<div>two: ${prop}</div>`;
    }
});
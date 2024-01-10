import { defineComponent, html } from "@tybalt/core";

export default defineComponent({
    name: 'tybalt-one',
    props: {
        prop: { default: 'primary' }
    },
    render({ prop }) {
        return html`<div>one: ${prop}</div>`;
    }
});
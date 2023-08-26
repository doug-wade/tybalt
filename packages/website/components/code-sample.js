import { defineComponent, html } from '@tybalt/core';

defineComponent({
    name: 'tybalt-footer',
    shadowMode: 'open',
    render() {
        return html`<footer>Tybalt distributed under the MIT license</footer>`;
    },
});

import { defineComponent, html } from '@tybalt/core';

import css from './circle.css';

export default defineComponent({
    name: 'example-circle',
    css,
    render() {
        return html`<div class="example-circle"></div>`;
    },
});

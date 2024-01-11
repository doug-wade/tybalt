import { defineComponent, html } from '@tybalt/core';
import { compose, required, url } from '@tybalt/validator';

export default defineComponent({
    name: 'tybalt-project-card',
    shadowMode: 'open',
    props: {
        url: {
            validator: compose(url(), required())
        },
        githubUrl: {
            validator: url()
        }
    },
    render({ url, githubUrl }) {
        return html`<div class="project-card">
            <slot name="title"></slot>
            <tybalt-link href="${url}">link</tybalt-link>
            <tybalt-link href="${githubUrl}">GitHub</tybalt-link>
            <slot name="description"></slot>
        </div>`;
    },
});

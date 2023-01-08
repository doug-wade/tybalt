import { defineComponent, html } from 'https://unpkg.com/@tybalt/core@0.0.10/dist/mjs/index.js';
import { compose, required, string, url } from 'https://unpkg.com/@tybalt/validator@0.0.10/dist/mjs/index.js';

defineComponent({
    name: 'tybalt-link',
    props: {
        href: {
            validator: compose(required(), string(), url()),
        },
        ariaLabel: {
            validator: required(),
        },
    },
    render({ ariaLabel, href }) {
        return html`<a href="${href}" aria-label="${ariaLabel}"><slot>link</slot></a>`;
    },
});

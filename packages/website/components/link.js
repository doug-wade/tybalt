import { defineComponent, html } from '@tybalt/core';
import { compose, required, string, url } from '@tybalt/validator';

defineComponent({
    name: 'tybalt-link',
    shadowMode: 'open',
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

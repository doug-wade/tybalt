import { defineComponent, html } from '@tybalt/core';
import { compose, required, string, url } from '@tybalt/validator';
import type { Reactive } from '@tybalt/reactive';

export default defineComponent({
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
    render({ ariaLabel, href }: { ariaLabel: Reactive, href: Reactive }) {
        return html`<a href="${href}" aria-label="${ariaLabel}"><slot>link</slot></a>`;
    },
    css: `
            a {
                color: var(--purple);
            }
        `,
});

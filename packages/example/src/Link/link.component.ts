import { defineComponent, html } from '@tybalt/core';
import { compose, url, required } from '@tybalt/validator';

export default defineComponent({
    name: 'example-link',
    shadowMode: 'open',
    props: {
        href: {
            validator: compose(required(), url())
        }
    },
    render({ href }: { href: string }) {
        return html`<a class="example-link" href="${href}"><slot></slot></a>` 
    }
});
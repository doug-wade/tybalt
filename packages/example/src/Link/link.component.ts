import type { Observable } from '@tybalt/core';

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
    setup({ href }: { href: Observable }) {
        return { href };
    },
    template({ href }: { href: string }) {
        return html`<a class="example-link" href="${href}"><slot></slot></a>` 
    }
});
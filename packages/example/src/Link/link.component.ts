import { defineComponent } from '@tybalt/core';
import { compose, url, required } from '@tybalt/validator';

export default defineComponent({
    name: 'example-link',
    props: {
        href: {
            validator: compose(required(), url())
        }
    },
    template: '<a class="example-link" href="${href}"><slot></slot></a>'
});
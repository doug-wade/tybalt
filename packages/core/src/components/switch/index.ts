import { defineComponent, html } from '../..';
import { required } from '@tybalt/validator';

export default defineComponent({
    name: 't-switch',
    shadowMode: 'open',
    props: {
        value: {
            validator: required,
        },
    },
    render({ value }: { value: any }) {
        return html`<slot name="${value}"></slot>`;
    },
});

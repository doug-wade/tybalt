import { defineComponent, html } from '..';
import { string } from '@tybalt/parser';
import { required } from '@tybalt/validator';

export default defineComponent({
    name: 't-switch',
    shadowMode: 'open',
    props: {
        value: {
            validator: required,
            parser: string,
        },
    },
    render({ value }: { value: string }) {
        return html`<slot name="${value}"></slot>`;
    },
});

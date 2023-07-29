import { defineComponent, html } from '..';
import { string } from '@tybalt/parser';
import { oneOf } from '@tybalt/validator';

export default defineComponent({
    name: 't-if',
    shadowMode: 'open',
    props: {
        condition: {
            validator: oneOf(['true', 'false']),
            parser: string,
        },
    },
    render({ condition }) {
        return html`<slot name="${condition}"></slot>`;
    },
});

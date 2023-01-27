import { defineComponent, html } from '../..';
import { array, compose, required, string } from '@tybalt/validator';

export default defineComponent({
    name: 't-for',
    props: {
        iterator: {
            validator: compose(required(), array()),
        },
        attributeName: {
            validator: string,
            default: 'value',
        },
    },
    render({ iterator, attributeName }: { iterator: Array<any>; attributeName: string }) {
        const templateElement = this.innerHTML('template');
        console.log(templateElement);
        const elements: Node[] = [];
        for (const item in iterator) {
            const templateContent = templateElement.content;
            const newNode = templateContent.cloneNode(true);
            newNode.setAttribute(attributeName, item);
        }
        return html`${elements.join('')}`;
    },
});

import { defineComponent, html } from '@tybalt/core';
import { compose, oneOf, required, string } from '@tybalt/validator';
import Observable from 'zen-observable';

export const BUTTON_VARIANTS = Object.freeze({
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary'
});

export default defineComponent({
    name: 'example-button',
    emits: ['click'],
    props: {
        variant: {
            default: BUTTON_VARIANTS.PRIMARY,
            validator: compose(required(), string(), oneOf(Object.values(BUTTON_VARIANTS)))
        }
    },
    render({ computedClass, clickHandler }) { 
        return html`<button class="button ${computedClass}" @click="${clickHandler}"><slot></slot></button>` 
    },
    css: '.button-primary { background-color: red }; .button-secondary: { background-color: blue };',
    setup(props, ctx) {
        const clickHandler = () => { ctx.emit('click') };
        const computedClass = new Observable(observer => {
            props.variant.observable.subscribe(() => {
                observer.next(`button-${props.variant}`);
            });
        });

        return {
            clickHandler,
            computedClass
        };
    }
});
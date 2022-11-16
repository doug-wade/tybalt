import { defineComponent, useObservable } from '@gambit/core';
import { compose, oneOf, required, string } from '@gambit/validator';

export const BUTTON_TYPES = Object.freeze({
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary'
});

export default defineComponent({
    name: 'ExampleButton',
    emits: ['click'],
    props: {
        variant: {
            default: BUTTON_TYPES.PRIMARY,
            validator: compose(required(), string(), oneOf(Object.values(BUTTON_TYPES)))
        }
    },
    template: '<button class="button ${computedClass}" @click="${clickHandler}"><slot></slot></button>',
    setup(props, ctx) {
        const clickHandler = () => { ctx.emit('click') };
        const { handler: setComputedClass, observer: computedClass } = useObservable(`button-${props.variant}`);

        props.variant.subscribe((value: string) => {
            setComputedClass(`button-${props.variant}`);
        });

        return {
            clickHandler,
            computedClass
        };
    }
});
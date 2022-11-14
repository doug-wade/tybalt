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
    setup(props, ctx) {
        const clickHandler = () => { ctx.emit('click') };
        const [buttonHandler, buttonObservable] = useObservable(`button-${props.variant}`);

        props.variant.subscribe((value: string) => {
            buttonHandler(`button-${props.variant}`);
        });

        return {
            clickHandler,
            buttonObservable
        };
    }
});
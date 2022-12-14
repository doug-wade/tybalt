import type { Observable, SubscriberFunction, PropsStateMap, SetupContext } from '@tybalt/core';

import { defineComponent, html, useObservable } from '@tybalt/core';
import { compose, oneOf, required, string } from '@tybalt/validator';

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
    template({ computedClass, clickHandler }: { computedClass: Observable, clickHandler: SubscriberFunction }) { 
        return html`<button class="button ${computedClass}" @click="${clickHandler}"><slot></slot></button>` 
    },
    setup(props: PropsStateMap, ctx: SetupContext) {
        const clickHandler = () => { ctx.emit('click') };
        const { handler: setComputedClass, observable: computedClass } = useObservable(`button-${props.variant}`);

        props.variant.observable.subscribe(() => {
            setComputedClass(`button-${props.variant}`);
        });

        return {
            clickHandler,
            computedClass
        };
    }
});
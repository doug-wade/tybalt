import type { PropsStateMap, SetupContext } from '@tybalt/core';

import { defineComponent, html } from '@tybalt/core';
import { compose, oneOf, required, string } from '@tybalt/validator';
import { map } from 'rxjs';

export const BUTTON_VARIANTS = Object.freeze({
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary'
});

export default defineComponent({
    name: 'example-button',
    shadowMode: 'open',
    emits: ['click'],
    css: `
        button {
            padding: 16px;
            border: 1px solid black;
            border-radius: 4px;
        }
        
        button-primary {
            background-color: rebeccapurple;
        }
        
        button-secondary {
            background-color: bisque;
        }
        
        button-tertiary {
            background: none;
            border: none;
            padding: 0;
            text-decoration: underline;
            cursor: pointer;
        }
    `,
    props: {
        variant: {
            default: BUTTON_VARIANTS.PRIMARY,
            validator: compose(required(), string(), oneOf(Object.values(BUTTON_VARIANTS)))
        }
    },
    render({ computedClass, clickHandler }) { 
        return html`<button class="button ${computedClass}" @click="${clickHandler}"><slot></slot></button>` 
    },
    setup(props: PropsStateMap, ctx: SetupContext) {
        const clickHandler = () => { ctx.emit('click') };
        const computedClass = props.variant.pipe(map((variant: string) => `button-${variant}`));

        return {
            clickHandler,
            computedClass
        };
    }
});
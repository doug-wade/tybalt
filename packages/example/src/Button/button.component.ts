import type { PropsStateMap, SetupContext, RenderContext } from '@tybalt/core';

import { defineComponent, html } from '@tybalt/core';
import { compose, oneOf, required, string } from '@tybalt/validator';
import { map } from 'rxjs';

import css from './button.css';

export const BUTTON_VARIANTS = Object.freeze({
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
});

export default defineComponent({
    name: 'example-button',
    shadowMode: 'open',
    emits: ['click'],
    css,
    props: {
        variant: {
            default: BUTTON_VARIANTS.PRIMARY,
            validator: compose(required(), string(), oneOf(Object.values(BUTTON_VARIANTS))),
        },
    },
    render({ computedClass, clickHandler }: RenderContext) {
        return html`<button class="button ${computedClass}" @click="${clickHandler}"><slot></slot></button>`;
    },
    setup({ variant }: PropsStateMap, { emit }: SetupContext) {
        const clickHandler = () => {
            emit('click');
        };
        const computedClass = variant.pipe(map((variant: string) => `button-${variant}`));

        return {
            clickHandler,
            computedClass,
        };
    },
});

import type { PropsStateMap, SetupContext, RenderContext } from '@tybalt/core';

import { defineComponent, html } from '@tybalt/core';
import { compose, oneOf, required, string } from '@tybalt/validator';
import { map } from 'rxjs';

import { theme } from '../contexts';

import css from './button.css';

export const BUTTON_VARIANTS = Object.freeze({
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
});

export default defineComponent({
    name: 'example-button',
    emits: ['click'],
    css,
    props: {
        variant: {
            default: BUTTON_VARIANTS.PRIMARY,
            validator: compose(required(), oneOf(Object.values(BUTTON_VARIANTS))),
        },
    },
    render({ computedClass, clickHandler, theme }: RenderContext) {
        return html`<style>
                :root {
                    --primary-color: ${theme.primaryColor};
                    --secondary-color: ${theme.secondaryColor};
                    --font-family: ${theme.fontFamily};
                }
            </style>
            <button class="button ${computedClass}" @click="${clickHandler}"><slot></slot></button>`;
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
    contexts: { theme },
});

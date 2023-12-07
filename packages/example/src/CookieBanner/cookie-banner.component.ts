import { defineComponent, html } from '@tybalt/core';
import { BUTTON_VARIANTS } from '../Button/button.component';
import { theme } from '../contexts';

import type { SetupContext, PropsStateMap, RenderContext } from '@tybalt/core';

export default defineComponent({
    name: 'example-cookie-banner',
    render({ clickHandler, PRIMARY, theme }: RenderContext) {
        return html`
            <style>
            .cookie-banner {
                font-family: ${theme.fontFamily};
            }
            </style>
            <div class="cookie-banner">
                <span>Please accept all cookies<span>
                <example-link href="http://www.example.com">Find out more</example-link>
                <example-button @click="${clickHandler}" variant="${PRIMARY}">Accept all cookies</example-button>
            </div>
        `;
    },
    setup(_: PropsStateMap, ctx: SetupContext) {
        const clickHandler = () => {
            console.log('got click!');
            ctx.emit('click');
        };

        return {
            clickHandler,
            PRIMARY: BUTTON_VARIANTS.PRIMARY,
        };
    },
    contexts: { theme },
});

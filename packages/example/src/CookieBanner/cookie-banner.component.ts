import type { SetupContext, PropsStateMap } from '@tybalt/core';

import { defineComponent, html } from '@tybalt/core';
import Link from '../Link/link.component';
import Button, { BUTTON_VARIANTS } from '../Button/button.component';

export default defineComponent({
    name: 'example-cookie-banner',
    components: [Link, Button],
    shadowMode: 'open',
    render({ clickHandler, PRIMARY }) {
        return html`
            <div class="cookie-banner">
                <span>Please accept all cookies<span>
                <example-link href="http://www.example.com">Find out more</example-link>
                <example-button @click="${ clickHandler }" variant="${ PRIMARY }">Accept all cookies</example-button>
            </div>
        `
    },
    setup(_: PropsStateMap, ctx: SetupContext) {
        const clickHandler = () => { ctx.emit('click'); };

        return {
            clickHandler,
            PRIMARY: BUTTON_VARIANTS.PRIMARY
        }
    }
})
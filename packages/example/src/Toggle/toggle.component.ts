import { defineComponent, html } from '@tybalt/core';
import { reactive } from '@tybalt/reactive';

import { theme } from '../contexts';
import { BUTTON_VARIANTS } from '../Button/button.component';

import type { RenderContext } from '@tybalt/core';

export default defineComponent({
    name: 'example-toggle',
    shadowRoot: 'open',
    render({ clickHandler, isChecked, TERTIARY }: RenderContext) {
        return html`<t-if condition="${isChecked}">
                <button @click=${clickHandler}>☀️</button>
            </t-if>
            <t-else condition="${!isChecked}">
                <button @click=${clickHandler} variant=${TERTIARY}>🌖</button>
            </t-else>`;
    },
    setup({ theme }, { emit }) {
        const isChecked = reactive(false);
        const clickHandler = () => {
            isChecked.addListener((value: boolean) => {
                theme.value = {
                    primaryColor: 'rebeccapurple',
                    secondaryColor: 'bisque',
                    fontFamily: 'Consolas',
                    linkColor: '#ffcc99',
                    inverseFontColor: 'black',
                    fontColor: 'white',
                };
                emit('click', { isChecked: !value });
            });
        };

        return { clickHandler, TERTIARY: BUTTON_VARIANTS.TERTIARY };
    },
    contexts: { theme },
});

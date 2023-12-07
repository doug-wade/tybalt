import { defineComponent, html } from '@tybalt/core';
import { theme } from '../contexts';

import { BUTTON_VARIANTS } from '../Button/button.component';

import type { RenderContext } from '@tybalt/core';

export default defineComponent({
    shadowRoot: 'open',
    render({ clickHandler, isChecked, TERTIARY }: RenderContext) {
        return html`<t-if condition="${isChecked}">
                <button onClick=${clickHandler}>☀️</button>
            </t-if>
            <t-else condition="${!isChecked}">
                <button onClick=${clickHandler} variant=${TERTIARY}>🌖</button>
            </t-else>`;
    },
    setup({ theme }, { emit }) {
        const isChecked = new BehaviorSubject(false);
        const clickHandler = () => {
            isChecked.subscribe((value: boolean) => {
                isChecked.next(!value);
                theme.observable.next({
                    primaryColor: 'rebeccapurple',
                    secondaryColor: 'bisque',
                    fontFamily: 'Consolas',
                    linkColor: '#ffcc99',
                    inverseFontColor: 'black',
                    fontColor: 'white',
                });
                emit('click', { isChecked: !value });
            });
        };

        return { clickHandler, TERTIARY: BUTTON_VARIANTS.TERTIARY };
    },
    contexts: { theme }
});

import { defineComponent, html } from '@tybalt/core';

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
    setup() {
        // TODO: https://github.com/doug-wade/tybalt/issues/38

        // const isChecked = new BehaviorSubject(false);
        // const clickHandler = () => {
        //     isChecked.subscribe((value) => {
        //         isChecked.next(!value);
        //         ctx.emit('click', { isChecked: !value });
        //     });
        // };

        return { TERTIARY: BUTTON_VARIANTS.TERTIARY };
    },
});

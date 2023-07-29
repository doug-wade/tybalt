import { defineComponent, html } from '@tybalt/core';
import { BehaviorSubject } from 'rxjs';

import Button, { BUTTON_VARIANTS } from '../Button/button.component';

import type { SetupContext, PropsStateMap, RenderContext } from '@tybalt/core';

export default defineComponent({
    components: [Button],
    shadowRoot: 'open',
    render({ clickHandler, isChecked, TERTIARY }: RenderContext) {
        return html`<t-if condition="${isChecked}">
                <button onClick=${clickHandler}>☀️</button>
            </t-if>
            <t-else condition="${!isChecked}">
                <button onClick=${clickHandler}>🌖</button>
            </t-else>`;
    },
    setup(_: PropsStateMap, ctx: SetupContext) {
        const isChecked = new BehaviorSubject(false);

        const clickHandler = () => {
            isChecked.subscribe((value) => {
                isChecked.next(!value);
                ctx.emit('click', { isChecked: !value });
            });
        };

        return { clickHandler, isChecked, TERTIARY: BUTTON_VARIANTS.TERTIARY };
    },
});

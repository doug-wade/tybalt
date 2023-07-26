import { defineComponent, html } from '@tybalt/core';
import { BehaviorSubject } from 'rxjs';

import Button, { BUTTON_VARIANTS } from '../Button/button.component';

import type { SetupContext, PropsStateMap, RenderContext } from '@tybalt/core';

export default defineComponent({
    components: [Button],
    render({ clickHandler, isChecked, TERTIARY }: RenderContext) {
        return html`<label>
            <slot name="label"></slot>
            <example-button @click="${clickHandler}" role="switch" aria-checked="${isChecked}" variant="${TERTIARY}">
                <span aria-hidden="true"><slot name="left"></slot></span>
                <span aria-hidden="true"><slot name="right"></slot></span>
            </example-button>
        </label>`;
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

import { defineComponent, html } from '@tybalt/core';
import { BehaviorSubject } from 'rxjs';

import { BUTTON_VARIANTS } from '../Button/button.component.js';

export default defineComponent({
    shadowMode: 'closed',
    name: 'example-counter',
    setup() {
        const count = new BehaviorSubject(0);
        const increment = () => count.next(count.value + 1);
        const decrement = () => count.next(count.value - 1);

        return {
            increment,
            decrement,
            count
        }
    },
    render({ count, increment, decrement }) {
        return html`<div class="example-counter">
            <div>Current count: ${count}</div>
            <example-button variant="${BUTTON_VARIANTS.PRIMARY}" @click="${increment}">+</example-button>
            <example-button variant="${BUTTON_VARIANTS.SECONDARY}" @click="${decrement}">-</example-button>
        </div>`;
    },
});

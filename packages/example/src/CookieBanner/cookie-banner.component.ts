import Link from '../Link/link.component';
import Button, { BUTTON_VARIANTS } from '../Button/button.component';

export default defineComponent({
    name: 'ExampleCookieBanner',
    components: [Link, Button],
    template: `
        <div class="cookie-banner">
            <span>Please accept all cookies<span>
            <example-link href="http://www.google.com">Find out more</example-link>
            <example-button @click="{clickHandler}" variant="${PRIMARY}">Accept all cookies</example-button>
        </div>
    `,
    setup(_, ctx) {
        const clickHandler = () => { ctx.emit('click'); };

        return {
            clickHandler,
            PRIMARY: BUTTON_VARIANTS.PRIMARY
        }
    }
})
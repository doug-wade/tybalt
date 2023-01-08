import { defineComponent, html } from 'https://unpkg.com/@tybalt/core@0.0.10/dist/mjs/index.js';

defineComponent({
    name: 'tybalt-header',
    render() {
        return html`
            <nav>
                <span>Tybalt Web Components</span>
                <span>
                    <tybalt-link href="https://github.com/doug-wade/tybalt">Github</tybalt-link>
                </span>
            </nav>
        `;
    },
    css: `
        nav {
            display: flex;
            justify-content: space-between;
        }
    `,
});

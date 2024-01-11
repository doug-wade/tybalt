import { defineComponent, html } from '@tybalt/core';

export default defineComponent({
    name: 'tybalt-header',
    shadowMode: 'open',
    render() {
        return html`
            <header>
                <nav>
                    <span>Tybalt Web Components</span>
                    <span>
                        <tybalt-link href="https://github.com/doug-wade/tybalt">Github</tybalt-link>
                    </span>
                </nav>
            </header>
        `;
    },
    css: `
        nav {
            display: flex;
            justify-content: space-between;
        }
    `,
});

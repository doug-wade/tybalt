import { defineComponent, html } from '@tybalt/core';

defineComponent({
    name: 'tybalt-header',
    shadowMode: 'open',
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

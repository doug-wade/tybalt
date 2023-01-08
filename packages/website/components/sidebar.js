import { defineComponent, html } from 'https://unpkg.com/@tybalt/core@0.0.10/dist/mjs/index.js';

const PACKAGES = ['cli', 'core', 'test-utils', 'validator'];

defineComponent({
    name: 'tybalt-sidebar',
    render() {
        const lis = PACKAGES.map((pkg) => {
            return html`
                <li>
                    <tybalt-link href="/tybalt/pages/${pkg}">@tybalt/${pkg}</tybalt-link>
                </li>
            `;
        });
        return html`
            <aside>
                <div>Individual Package Documentation</div>
                <ul>
                    ${lis.join('')}
                </ul>
                <tybalt-link href="https://discord.gg/FHpfstT7Dw">Join the Discord server</tybalt-link>
            </aside>
        `;
    },
});

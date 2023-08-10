import { defineComponent, html } from '@tybalt/core';

const PACKAGES = ['cli', 'core', 'eleventy-plugin', 'esbuild-plugin', 'eslint-plugin', 'test-utils', 'validator'];
const GUIDES = ['new-website', 'styling-your-component', 'writing-tests'];

defineComponent({
    name: 'tybalt-sidebar',
    shadowMode: 'open',
    render() {
        const packageLis = PACKAGES.map((pkg) => {
            return html`
                <li>
                    <tybalt-link href="/pages/${pkg}">@tybalt/${pkg}</tybalt-link>
                </li>
            `;
        });
        const guideLis = GUIDES.map((guide) => {
            return html`
                <li>
                    <tybalt-link href="/pages/${guide}-guide">${guide} guide</tybalt-link>
                </li>
            `;
        });
        return html`
            <aside>
                <div>Individual Package Documentation</div>
                <ul>
                    ${packageLis.join('')}
                </ul>
                <div>Guides</div>
                <ul>
                    ${guideLis.join('')}
                </ul>
                <tybalt-link href="https://discord.gg/FHpfstT7Dw">Join the Discord server</tybalt-link>
                <tybalt-link href="https://dougwade.substack.com/">Subscribe to the Substack</tybalt-link>
            </aside>
        `;
    },
});

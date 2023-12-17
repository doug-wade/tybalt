import { defineComponent, html } from '@tybalt/core';

const PACKAGES = ['cli', 'core', 'eleventy-plugin', 'esbuild-plugin', 'eslint-plugin', 'parser', 'reactive', 'test-utils', 'validator'];
const GUIDES = ['props', 'events', 'slots', 'new-website', 'styling-your-component', 'writing-tests', 'custom-validator', 'data-fetching', 'linting', 'building'];

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
                    <tybalt-link href="/pages/${guide}-guide">${guide.replaceAll('-', ' ')}</tybalt-link>
                </li>
            `;
        });
        return html`
            <aside>
                <div>Individual Package Documentation</div>
                <ul>
                    ${packageLis}
                </ul>
                <div>Guides</div>
                <ul>
                    ${guideLis}
                </ul>
                <tybalt-link href="https://discord.gg/FHpfstT7Dw">Join the Discord server</tybalt-link>
                <tybalt-link href="https://dougwade.substack.com/">Subscribe to the Substack</tybalt-link>
            </aside>
        `;
    },
});

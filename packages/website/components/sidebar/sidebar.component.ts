import { defineComponent, html } from '@tybalt/core';

const PACKAGES = [
    'cli',
    'core',
    'eleventy-plugin',
    'esbuild-plugin',
    'eslint-plugin',
    'parser',
    'reactive',
    'test-utils',
    'validator',
];
const GUIDES = [
    'props',
    'events',
    'slots',
    'new-website',
    'styling-your-component',
    'writing-tests',
    'custom-validator',
    'data-fetching',
    'linting',
    'building',
];

export default defineComponent({
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
                    <tybalt-link href="/guides/${guide}">${guide.replaceAll('-', ' ')}</tybalt-link>
                </li>
            `;
        });
        return html`
            <aside>
                <h4>Individual Package Documentation</h4>
                <ul>
                    ${packageLis}
                </ul>
                <h4>Guides</h4>
                <ul>
                    ${guideLis}
                </ul>
                <h4>Learn More</h4>
                <ul>
                    <li><tybalt-link href="/built-with-tybalt">See projects built with Tybalt</tybalt-link></li>
                    <li><tybalt-link href="https://discord.gg/FHpfstT7Dw">Join the Discord server</tybalt-link></li>
                    <li><tybalt-link href="https://dougwade.substack.com/">Subscribe to the Substack</tybalt-link></li>
                </ul>
            </aside>
        `;
    },
});

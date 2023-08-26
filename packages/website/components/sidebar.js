import { defineComponent, html } from '@tybalt/core';

const packages = ['cli', 'core', 'eleventy-plugin', 'esbuild-plugin', 'eslint-plugin', 'parser', 'test-utils', 'validator'];
const guides = ['new-website', 'styling-your-component', 'writing-tests', 'custom-validator'];

defineComponent({
    name: 'tybalt-sidebar',
    shadowMode: 'open',
    render() {
        return html`
            <aside>
                <link-list links="${packages}" formatter="/pages/{}">
                    <h4>Individual Package Documentation</h4>
                </link-list>
                <link-list links="${guides}" formatter="/pages/{}-guide">
                    <h4>Guides</h4>
                </link-list>
                <link-list>
                    <h4>Additional Resources</h4>
                    <tybalt-link href="https://discord.gg/FHpfstT7Dw">Join the Discord server</tybalt-link>
                    <tybalt-link href="https://dougwade.substack.com/">Subscribe to the Substack</tybalt-link>
                </link-list>
            </aside>
        `;
    },
});

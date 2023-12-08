import { defineComponent, html } from '@tybalt/core';

defineComponent({
    name: 'tybalt-main',
    shadowMode: 'open',
    render() {
        return html`<div>
            <h1>Tybalt</h1>
            <h2>A collection of tools for building web components</h2>
            <p>
                Tybalt is a collection of tools for building web components. It is designed to be modular, so you can
                use as much or as little as you want.
            </p>
            <p>
                Tybalt built with a "use the platform" mentality, so it uses the latest web platform features to provide
                the best developer experience.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Static Site Generation</li>
                <li>Web Component Development</li>
                <li>Compiler</li>
                <li>Unit Testing</li>
                <li>Linting</li>
                <li>Parsing and Validation</li>
            </ul>
            <h2>Core Concepts</h2>
            <h3>Web Components</h3>
            <p>
                Tybalt exports tools for building web components. It uses templates, slots, custom elements and the
                shadow dom to implement rendering.
            </p>
            <tybalt-code-example language="javascript">
import { defineComponent, html } from '@tybalt/core';

export default defineComponent({
    name: 'my-component',
    shadowMode: 'open',
    render() {
        return html\`<div>Hello World</div>\`;
    },
});
            </tybalt-code-example>
            <h3>Unit Testing</h3>
            <p>
                Tybalt exports tools for testing web components. It uses Jest and JSDOM to render web components in a
                test environment.
            </p>
            <tybalt-code-example language="javascript">
import MyComponent from './my-component.js';
import { mount } from '@tybalt/test-utils';

describe('my-component', () => {
    it('renders', async () => {
        const el = await mount(MyComponent);

        expect(el.shadowHtml()).toContain('Hello World');
    });
});
            </tybalt-code-example>
            <h3>Compilation</h3>
            <p>
                Tybalt exports a compiler for compiling web components. It uses esbuild to compile web components to a
                single file and a plugin called @tybalt/esbuild-plugin.
            </p>
            <h3>Linting</h3>
            <p>
                Tybalt exports a linter for linting web components. It uses eslint to lint web components and a plugin
                called @tybalt/eslint-plugin.
            </p>
            <h2>Getting Started</h2>
            <p>The fastest way to get started is creating a static website</p>
            <tybalt-code-example language="shell">
$ npx @tybalt/cli scaffold eleventy -n my-static-website
            </tybalt-code-example>
            <p>Then, you can start the development server</p>
            <tybalt-code-example language="shell">
$ npx @11ty/eleventy --serve
            </tybalt-code-example>
            <p>And open the site at <tybalt-link href="http://localhost:8080/">http://localhost:8080/</tybalt-link></p>
        </div>`;
    },
});

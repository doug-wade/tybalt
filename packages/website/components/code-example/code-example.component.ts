import { defineComponent, html } from '@tybalt/core';
import { compose, string, required } from '@tybalt/validator';

import Prism from 'prismjs/prism.js';
import syntaxHighlighting from '../../../../node_modules/prism-themes/themes/prism-night-owl.css' assert { type: 'css' };

function encode(str) {
    return str.replaceAll('&gt;', '>');
}

defineComponent({
    name: 'tybalt-code-example',
    shadowMode: 'open',
    css: syntaxHighlighting,
    props: {
        language: {
            validator: compose(string, required),
        },
    },
    setup({ language }) {
        const code = this.innerHTML.replace(/^\s+/g, '');
        const languageCode = language === 'shell' ? Prism.languages.shell : Prism.languages.javascript;
        const highlighted = Prism.highlight(encode(code), languageCode, language);
``
        return {
            code: highlighted,
        };
    },
    render({ code, language }) {
        return html` <pre><code class="language-${language}">${code}</code></pre> `;
    },
});

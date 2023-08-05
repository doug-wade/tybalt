const rules = require('./rules/index.js');

module.exports = {
    rules,
    configs: {
        recommended: {
            parserOptions: {
                ecmaVersion: 2021,
            },
            plugins: ['@tybalt/eslint-plugin'],
            env: { browser: true, es2021: true },
            extends: ['eslint:recommended'],
            rules: {
                '@tybalt/component-names-are-multi-word': 'error',
            },
        },
        'ts-recommended': {
            plugins: ['@typescript-eslint', '@tybalt/eslint-plugin'],
            parser: '@typescript-eslint/parser',
            env: { browser: true, es2021: true },
            extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
            rules: {
                '@tybalt/component-names-are-multi-word': 'error',
            },
        },
    },
};

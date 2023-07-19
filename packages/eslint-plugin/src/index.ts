// @ts-ignore
import { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import rules from './rules/index.js';

const config = {
    rules,
    configs: {
        recommended: {
            parserOptions: {
                ecmaVersion: 2021,
            },
            plugins: ['@tybalt'],
            env: ['browser', 'es2021'],
            extends: ['eslint:recommended'],
            rules: {
                '@tybalt/component-names-are-multi-word': 'error',
            },
        },
        'ts-recommended': {
            plugins: ['@tybalt'],
            parser: '@typescript-eslint/parser',
            env: ['browser', 'es2021'],
            extends: ['eslint:recommended'],
            rules: {
                '@tybalt/component-names-are-multi-word': 'error',
            },
        },
    },
};

export default config;

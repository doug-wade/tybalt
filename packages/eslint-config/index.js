import tybaltEslintPlugin from '@tybalt/eslint-plugin';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import js from '@eslint/js';

const recommended = [
    js.configs.recommended,
    {
        parserOptions: {
            ecmaVersion: 2022,
        },
        plugins: {
            '@tybalt/eslint-plugin': tybaltEslintPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.es2022,
                ...globals.browser
            }
        },
        rules: {
            '@tybalt/component-names-are-multi-word': 'error',
        },
    }
];

const tsRecommended = tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            '@tybalt/eslint-plugin': tybaltEslintPlugin, 
            '@typescript-eslint': typescriptEslintPlugin
        },
        languageOptions: {
            parser: '@typescript-eslint/parser',
            globals: {
                ...globals.es2022,
                ...globals.browser
            }
        },
        rules: {
            '@tybalt/component-names-are-multi-word': 'error',
        },
    }
);

export {
    recommended,
    tsRecommended,
};
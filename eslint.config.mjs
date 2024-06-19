import { tsRecommended } from '@tybalt/eslint-config';

export default [
    tsRecommended, 
    {
        ignorePatterns: ['packages/**/node_modules'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
        overrides: [
            {
                files: ['*.cy.js'],
                extends: ['plugin:cypress/recommended'],
            },
        ],
    }
];

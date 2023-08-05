// eslint-disable-next-line no-undef
module.exports = {
    extends: ['plugin:@tybalt/eslint-plugin/ts-recommended'],
    plugins: ['@tybalt/eslint-plugin'],
    ignorePatterns: ['packages/**/node_modules'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
    },
};

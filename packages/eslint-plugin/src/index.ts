import rules from "./rules";

export = {
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
        '@tybalt/component-names-are-multi-word': 'error'
      }
    },
    'ts-recommended': {
      plugins: ['@tybalt'],
      parser: '@typescript-eslint/parser',
      env: ['browser', 'es2021'],
      extends: ['eslint:recommended'],
      rules: {
        '@tybalt/component-names-are-multi-word': 'error'
      }
    }
  }
};

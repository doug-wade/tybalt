const { ESLintUtils } = require('@typescript-eslint/utils');

const createEslintRule = ESLintUtils.RuleCreator(
    (name: string) => `https://doug-wade.github.io/tybalt/eslint-plugin/rule/${name}`,
);

module.exports = createEslintRule;

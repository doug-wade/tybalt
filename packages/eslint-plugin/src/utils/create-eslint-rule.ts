// @ts-ignore
import { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { ESLintUtils } from '@typescript-eslint/utils';

const createEslintRule = ESLintUtils.RuleCreator(
    (name) => `https://doug-wade.github.io/tybalt/eslint-plugin/rule/${name}`,
);

export default createEslintRule;

import type { TSESTree } from '@typescript-eslint/types';
import type { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';

const { AST_NODE_TYPES, ESLintUtils } = require('@typescript-eslint/utils');
const { toKebabCase } = require('js-convert-case');

const getDefinitionKey = require('../utils/get-definition-key');
const { TYBALT_COMPONENT_DEFINITION } = require('../utils/selectors');

const RULE_NAME = 'component-names-are-multi-word';
export type MessageIds = 'singleWordComponentName';
export type Options = [];

const createEslintRule = ESLintUtils.RuleCreator(
    (name: string) => `https://doug-wade.github.io/tybalt/eslint-plugin/rule/${name}`,
);

const rule: RuleModule<'singleWordComponentName', never[], RuleListener> = createEslintRule({
    name: RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'ensure tybalt component names are multi-word',
            recommended: 'strict',
        },
        schema: [],
        messages: {
            singleWordComponentName: 'Component names must be multi-word.',
        },
    },
    defaultOptions: [],
    create: (context: { report: (arg0: { messageId: string; loc: any }) => void }) => {
        return {
            [TYBALT_COMPONENT_DEFINITION](node: TSESTree.CallExpression) {
                const definition = node.arguments[0];

                if (definition.type !== AST_NODE_TYPES.ObjectExpression) {
                    return;
                }

                const nameProperty = getDefinitionKey({ key: 'name', node: definition });

                if (
                    !nameProperty ||
                    nameProperty.type !== AST_NODE_TYPES.Property ||
                    nameProperty.value.type !== AST_NODE_TYPES.Literal
                ) {
                    return;
                }

                const name = nameProperty.value.value;

                if (typeof name !== 'string') {
                    return;
                }

                const kebabCaseName = toKebabCase(name);

                if (!kebabCaseName.includes('-')) {
                    context.report({
                        messageId: 'singleWordComponentName',
                        loc: node.loc,
                    });
                }
            },
        };
    },
});

module.exports = rule;

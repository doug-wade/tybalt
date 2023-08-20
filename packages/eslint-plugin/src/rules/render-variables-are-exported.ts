import type { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import type { TSESTree } from '@typescript-eslint/utils';

const { AST_NODE_TYPES } = require('@typescript-eslint/utils');

const { TYBALT_COMPONENT_DEFINITION } = require('../utils/selectors');
const createEslintRule = require('../utils/create-eslint-rule');
const getDefinitionKey = require('../utils/get-definition-key');

export const RULE_NAME = 'template-variables-are-exported';
export type MessageIds = 'renderVariableNotExported';
export type Options = [];

const rule: RuleModule<'renderVariableNotExported', never[], RuleListener> = createEslintRule({
    name: RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'check that all template variables have been exported = require(the setup method',
            recommended: 'strict',
        },
        schema: [],
        messages: {
            renderVariableNotExported: 'The template variable used has not been exported = require(the setup method.',
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

                const renderProperty = getDefinitionKey({ key: 'render', node: definition });

                if (
                    !renderProperty ||
                    renderProperty.type !== AST_NODE_TYPES.Property ||
                    renderProperty.value.type !== AST_NODE_TYPES.FunctionExpression
                ) {
                    return;
                }

                const firstRenderArg = renderProperty.value.params[0];

                if (firstRenderArg.type !== AST_NODE_TYPES.ObjectPattern) {
                    return;
                }

                const renderFunctionArgs = firstRenderArg.properties
                    .map((prop: { type: any; key: any; }) => {
                        const property = prop.type === AST_NODE_TYPES.Property ? prop.key : null;
                        if (property?.type !== AST_NODE_TYPES.Identifier) {
                            return;
                        }
                        return property.name;
                    })
                    .filter((prop: any) => !!prop);

                if (renderFunctionArgs.length < 1) {
                    return;
                }

                const setupProperty = getDefinitionKey({ key: 'setup', node: definition });

                if (!setupProperty) {
                    return context.report({
                        messageId: 'renderVariableNotExported',
                        loc: renderProperty.loc,
                    });
                } else if (
                    setupProperty.type !== AST_NODE_TYPES.Property ||
                    setupProperty.value.type !== AST_NODE_TYPES.FunctionExpression
                ) {
                    return;
                }

                function hasMissingVariables(returnStatement: TSESTree.ReturnStatement) {
                    if (
                        !returnStatement.argument ||
                        returnStatement.argument.type !== AST_NODE_TYPES.ObjectExpression
                    ) {
                        return context.report({
                            messageId: 'renderVariableNotExported',
                            loc: returnStatement.loc,
                        });
                    }

                    const returnedProps = (returnStatement.argument as TSESTree.ObjectExpression).properties
                        .map((prop) => {
                            if (prop.type !== AST_NODE_TYPES.Property || (prop as TSESTree.Property).key.type !== AST_NODE_TYPES.Identifier) {
                                return undefined;
                            }
                            return ((prop as TSESTree.Property).key as TSESTree.Identifier).name;
                        })
                        .filter((prop: any) => !!prop);

                    return renderFunctionArgs.find((prop: any) => {
                        return !returnedProps.includes(prop);
                    });
                }

                const returnStatements = setupProperty.value.body.body.filter(
                    (statement: { type: any; }) => statement.type === AST_NODE_TYPES.ReturnStatement,
                ) as TSESTree.ReturnStatement[];

                for (const returnStatement of returnStatements) {
                    if (hasMissingVariables(returnStatement)) {
                        return context.report({
                            messageId: 'renderVariableNotExported',
                            loc: returnStatement.loc,
                        });
                    }
                }
            },
        };
    },
});

export default rule;

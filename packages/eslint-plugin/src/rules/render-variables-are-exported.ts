import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import type { TSESTree } from '@typescript-eslint/utils';

import { TYBALT_COMPONENT_DEFINITION } from '../utils/selectors';
import createEslintRule from '../utils/create-eslint-rule';
import getDefinitionKey from '../utils/get-definition-key';

export const RULE_NAME = 'template-variables-are-exported';
export type MessageIds = 'renderVariableNotExported';
export type Options = [];

const rule: RuleModule<'renderVariableNotExported', never[], RuleListener> = createEslintRule({
    name: RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'check that all template variables have been exported from the setup method',
            recommended: 'strict',
        },
        schema: [],
        messages: {
            renderVariableNotExported: 'The template variable used has not been exported from the setup method.',
        },
    },
    defaultOptions: [],
    create: (context) => {
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
                    .map((prop) => {
                        const property = prop.type === AST_NODE_TYPES.Property ? prop.key : null;
                        if (property?.type !== AST_NODE_TYPES.Identifier) {
                            return;
                        }
                        return property.name;
                    })
                    .filter((prop) => !!prop);

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

                    const returnedProps = returnStatement.argument.properties
                        .map((prop) => {
                            if (prop.type !== AST_NODE_TYPES.Property || prop.key.type !== AST_NODE_TYPES.Identifier) {
                                return undefined;
                            }
                            return prop.key.name;
                        })
                        .filter((prop) => !!prop);

                    return renderFunctionArgs.find((prop) => {
                        return !returnedProps.includes(prop);
                    });
                }

                const returnStatements = setupProperty.value.body.body.filter(
                    (statement: { type: AST_NODE_TYPES }) => statement.type === AST_NODE_TYPES.ReturnStatement,
                ) as TSESTree.ReturnStatement[];

                for (let returnStatement of returnStatements) {
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

import type { TSESTree } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { toKebabCase } from 'js-convert-case';

import getDefinitionKey from '../utils/get-definition-key';
import { createEslintRule } from '../utils/create-eslint-rule';
import { TYBALT_COMPONENT_DEFINITION } from '../utils/selectors';

export const RULE_NAME = 'component-names-are-multi-word';
export type MessageIds = 'singleWordComponentName';
export type Options = [];

export default createEslintRule<Options, MessageIds>({
   name: RULE_NAME,
   meta: {
      type: 'problem',
      docs: {
         description: 'ensure tybalt component names are multi-word',
         recommended: 'error'
      },
      schema: [],
      messages: {
         singleWordComponentName: 'Component names must be multi-word.'
      }
   },
   defaultOptions: [],
   create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
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
                  loc: node.loc
               });
            }
         }
      }
   }
});

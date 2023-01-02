import type { TSESTree } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint';
import { createEslintRule } from '../utils/create-eslint-rule';
import { TYBALT_COMPONENT_DEFINITION } from '../utils/selectors';

export const RULE_NAME = 'template-variables-are-exported';
export type MessageIds = 'templateVariableNotExported';
export type Options = [];

export default createEslintRule<Options, MessageIds>({
   name: RULE_NAME,
   meta: {
      type: 'problem',
      docs: {
         description: 'check that all template variables have been exported from the setup method',
         recommended: 'error'
      },
      schema: [],
      messages: {
         templateVariableNotExported: 'The template variable used has not been exported from the setup method.'
      }
   },
   defaultOptions: [],
   create: (context: Readonly<RuleContext<MessageIds, Options>>) => {
      return {
         [TYBALT_COMPONENT_DEFINITION](node: TSESTree.Decorator) {

         }
      }
   }
});
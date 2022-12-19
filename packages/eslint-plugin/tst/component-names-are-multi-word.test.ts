import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import rule, { MessageIds, RULE_NAME} from '../src/rules/component-names-are-multi-word';

const ruleTester: RuleTester = new RuleTester({
   parser: require.resolve('@typescript-eslint/parser')
});

const messageId: MessageIds = 'singleWordComponentName';

ruleTester.run(RULE_NAME, rule, {
   valid: [`
      export default defineComponent({
         name: "multi-word"
      });
   `, `
      export default defineComponent({
         name: "MultiWord"
      });
   `],
   invalid: [
      { 
         code: `
            export default defineComponent({
               name: "single"
            });
         `, errors: [{ messageId }] 
      },
   ]
});

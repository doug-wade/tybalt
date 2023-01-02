import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import rule, { MessageIds, RULE_NAME} from '../src/rules/template-variables-are-exported';

const ruleTester: RuleTester = new RuleTester({
   parser: require.resolve('@typescript-eslint/parser')
});

const messageId: MessageIds = 'templateVariableNotExported';

ruleTester.run(RULE_NAME, rule, {
    valid: [`
       export default defineComponent({
          template: html\`\${value}\`,
          setup() { export default { value: 0 } },
       });
    `],
    invalid: [
       { 
          code: `
             export default defineComponent({
                "template": html\`\${value}\`,
                "setup": { export default {} },
             });
          `, errors: [{ messageId }] 
       },
       { 
          code: `
             export default defineComponent({
                "template": html\`\${value}\`,
             });
          `, errors: [{ messageId }] 
       },
       { 
          code: `
             export default defineComponent({
                "template": html\`\${value}\`,
                "setup": { },
             });
          `, errors: [{ messageId }] 
       },
    ]
 });
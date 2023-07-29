import { RuleTester } from '@typescript-eslint/rule-tester';
import rule, { MessageIds, RULE_NAME } from '../src/rules/render-variables-are-exported';

const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
});

const messageId: MessageIds = 'renderVariableNotExported';

ruleTester.run(RULE_NAME, rule, {
    valid: [
        `
           export default defineComponent({
              render({ value }) {
                return html\`\${value}\`;
              },
              setup() { return { value: 0 } },
           });
        `,
    ],
    invalid: [
        {
            code: `
             export default defineComponent({
                render({ value }) {
                    return html\`\${value}\`;
                },
                setup() { return {}; },
             });
          `,
            errors: [{ messageId }],
        },
        {
            code: `
             export default defineComponent({
                render({ value }) {
                    return html\`\${value}\`;
                }
             });
          `,
            errors: [{ messageId }],
        },
        {
            code: `
             export default defineComponent({
                render({ otherProp }) {
                    return html\`\${otherProp}\`;
                },
                setup() { return { someProp: 'hello world' } },
             });
          `,
            errors: [{ messageId }],
        },
    ],
});

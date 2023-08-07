/* eslint-disable no-undef */

const { RuleTester } = require('@typescript-eslint/rule-tester');
const rule = require('../src/rules/component-names-are-multi-word');

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
});

const messageId = 'singleWordComponentName';

ruleTester.run('component-names-are-multi-word', rule, {
    valid: [
        `
      export default defineComponent({
         name: "multi-word"
      });
   `,
        `
      export default defineComponent({
         name: "MultiWord"
      });
   `,
    ],
    invalid: [
        {
            code: `
            export default defineComponent({
               name: "single"
            });
         `,
            errors: [{ messageId }],
        },
    ],
});

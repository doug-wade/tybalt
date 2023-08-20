// eslint-disable-next-line @typescript-eslint/no-var-requires
const failOnConsole = require('jest-fail-on-console');

failOnConsole({
    shouldFailOnLog: true,
    shouldFailOnInfo: true,
    shouldFailOnDebug: true,
    shouldFailOnAssert: true,
});

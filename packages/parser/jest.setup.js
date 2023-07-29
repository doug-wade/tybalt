const failOnConsole = require('jest-fail-on-console');

failOnConsole({
    shouldFailOnLog: true,
    shouldFailOnInfo: true,
    shouldFailOnDebug: true,
    shouldFailOnAssert: true,
});

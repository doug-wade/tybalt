import failOnConsole from "jest-fail-on-console";

failOnConsole({
  shouldFailOnLog: true,
  shouldFailOnInfo: true,
  shouldFailOnDebug: true,
  shouldFailOnAssert: true,
});

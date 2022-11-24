const testUtilLocation = require.resolve("@tybalt/test-utils");

module.exports = {
  moduleFileExtensions: ["js", "ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [`${testUtilLocation}/../../dist/setup.js`],
  rootDir: process.cwd(),
};

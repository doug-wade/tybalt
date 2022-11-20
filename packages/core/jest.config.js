export default {
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
  setupFilesAfterEnv: [
    "../../node_modules/@tybalt/test-utils/dist/setup.js",
    "<rootDir>/jest.setup.js",
  ],
  collectCoverageFrom: ["src/**/*.ts"],
};

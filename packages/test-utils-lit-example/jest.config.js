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
  setupFilesAfterEnv: ["../../node_modules/@gambit/test-utils/dist/setup.js"],
};

module.exports = {
  moduleFileExtensions: ["js", "ts"],
  extensionsToTreatAsEsm: [".ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(lit-html|lit-element|lit|@lit)/)",
  ],
  transform: {
    "^.+\\.(ts|js|jsx)$": ["@swc/jest"],
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [
    "../../node_modules/@tybalt/test-utils/dist/cjs/setup.js",
    "<rootDir>/jest.setup.js",
  ],
};

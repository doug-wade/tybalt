module.exports = {
  moduleFileExtensions: ["js", "ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": ["esbuild-jest"],
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
};

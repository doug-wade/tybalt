export default {
  testMatch: ["**/tst/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["js", "ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  collectCoverageFrom: ["src/**/*.ts"],
};

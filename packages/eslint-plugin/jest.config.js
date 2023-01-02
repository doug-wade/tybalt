module.exports = {
  moduleFileExtensions: ["js", "ts"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  collectCoverageFrom: ["src/**/*.ts"],
};

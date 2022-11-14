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
  moduleNameMapper: {
    "#src/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
};

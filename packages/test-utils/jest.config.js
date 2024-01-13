module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': ['@swc/jest'],
    },
    moduleNameMapper: {
        '#src/(.*)': '<rootDir>/src/$1',
        // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
        uuid: require.resolve('uuid'),
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverageFrom: ['src/'],
};

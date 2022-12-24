module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': ['@swc/jest'],
    },
    moduleNameMapper: {
        '#src/(.*)': '<rootDir>/src/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

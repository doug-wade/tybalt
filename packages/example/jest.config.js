export default {
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
        '^.+\\.css$': '<rootDir>/__mocks__/style-mock.ts',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['../../node_modules/@tybalt/test-utils/dist/cjs/setup.js', '<rootDir>/jest.setup.js'],
};

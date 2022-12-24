export default {
    testMatch: ['**/tst/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

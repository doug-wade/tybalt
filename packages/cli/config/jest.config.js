export default {
    transformIgnorePatterns: ['/node_modules/(?!(rxjs)/)'],
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: [`@tybalt/test-utils/dist/cjs/setup.js`],
    rootDir: process.cwd(),
};

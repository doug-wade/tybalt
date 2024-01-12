module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': ['@swc/jest'],
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverageFrom: ['src/']
};

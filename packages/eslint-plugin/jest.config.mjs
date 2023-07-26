export default {
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
};

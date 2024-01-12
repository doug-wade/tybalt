export default {
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    collectCoverageFrom: ['src/']
};

export default () => {
    return `module.exports = {
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@tybalt/test-utils/dist/cjs/setup.js'],
};`;
};

import type { ScaffoldContext } from '../types';

export default () => {
    return `module.exports = {
    transform: {
        '^.+\\.tsx?$': 'esbuild-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@tybalt/test-utils/dist/cjs/setup.js'],
};`;
};

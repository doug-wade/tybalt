import type { ScaffoldContext } from '../types';

export default ({ kebabCaseName }: ScaffoldContext) => {
    return `
        module.exports = {
            testEnvironment: 'jest-environment-jsdom',
            setupFilesAfterEnv: ['@tybalt/test-utils/dist/cjs/setup.js'],
        };
    `;
};

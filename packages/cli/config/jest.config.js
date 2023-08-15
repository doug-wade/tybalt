import fs from 'node:fs';
import { findUp, findUpStop } from 'find-up';

let rootDir;

await findUp(directory => {
    const candidatePath = `${directory}/node_modules/@tybalt/test-utils/dist/cjs/setup.js`;
	if (fs.existsSync(candidatePath)) {
        rootDir = directory;
        return findUpStop;
    } else {
        return candidatePath;
    }
});

export default {
    moduleFileExtensions: ['js', 'ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.m?[tj]sx?$': [
            'ts-jest',
            {
                useESM: true
            },
        ],
        '\\.(css|less|sass|scss)$': `${rootDir}/node_modules/@tybalt/cli/config/style-mock.js`
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: [
        `${rootDir}/node_modules/@tybalt/test-utils/dist/cjs/setup.js`
    ],
    rootDir: process.cwd(),
    transformIgnorePatterns: [
        '/node_modules/(?!(@tybalt)/)', 
        `${rootDir}/packages/test-utils`,
    ],
};

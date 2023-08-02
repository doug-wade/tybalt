import { describe, it, expect } from '@jest/globals';
import child_process from 'node:child_process';
import path from 'node:path';

describe('cli', () => {
    it('should emit the version', () => {
        const binScriptPath = path.resolve(`${__dirname}/../src/index.ts`);
        const results = child_process.execSync(`npx ts-node-esm ${binScriptPath} --version`);

        expect(results.toString()).toEqual('0.0.16\n');
    });

    it('should not error when you forget a name when scaffolding', () => {
        const binScriptPath = path.resolve(`${__dirname}/../src/index.ts`);

        let caughtError;
        try {
            child_process.execSync(`npx ts-node-esm ${binScriptPath} scaffold eleventy`);
        } catch (error) {
            // execSync throws an error when the command fails, but we expect the command to fail because
            // we're testing an error message, so we catch the error and continue
            caughtError = error;
        }

        expect(caughtError.message).not.toContain('ERR_INVALID_ARG_TYPE');
        expect(caughtError.message).toContain("error: required option '-n, --name <string>' not specified");
    });
});

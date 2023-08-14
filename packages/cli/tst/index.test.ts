import { describe, it, expect } from '@jest/globals';
import child_process from 'node:child_process';
import packageJson from '../package.json';

describe('cli', () => {
    it('should emit the version', () => {
        const results = child_process.execSync(`yarn run cli --version`);

        expect(results.toString()).toContain(packageJson.version);
    });

    it('should not error when you forget a name when scaffolding', () => {
        let caughtError;
        try {
            child_process.execSync(`yarn run cli scaffold eleventy`);
        } catch (error) {
            // execSync throws an error when the command fails, but we expect the command to fail because
            // we're testing an error message, so we catch the error and continue
            caughtError = error;
        }

        expect(caughtError.message).not.toContain('ERR_INVALID_ARG_TYPE');
        expect(caughtError.message).toContain("error: required option '-n, --name <string>' not specified");
    });
});

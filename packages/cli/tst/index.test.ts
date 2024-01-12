import { describe, it, expect } from '@jest/globals';
import util from 'node:util';
import { exec as cpExec, execSync } from 'node:child_process';
import packageJson from '../package.json';

const exec = util.promisify(cpExec);
const outDir = './out';

describe('cli', () => {
    beforeAll(async () => {
        [
            'lint',
            'test'
        ].forEach(cmd => {
            execSync(`rm -rf ${cmd}`, { cwd: outDir });
        });
    });

    it('should emit the version', async () => {
        const results = await exec(`node dist/index.js --version`);

        expect(results.stdout.toString()).toContain(packageJson.version);
    });

    it('should not error when you forget a name when scaffolding', async () => {
        let err;
        try {
            await exec(`node dist/index.js scaffold eleventy`);
        } catch (e) {
            err = e;
        }

        expect(err.message).not.toContain('ERR_INVALID_ARG_TYPE');
        expect(err.message).toContain("error: required option '-n, --name <string>' not specified");
    });

    it('should scaffold an eleventy site that passes the unit tests', async () => {
        const testName = 'test';

        await exec(`node ../dist/index.js scaffold eleventy -n ${testName}`, { cwd: outDir });
        await exec('yarn install', { cwd: outDir });
        const results = exec(`yarn test`, { cwd: outDir });

        expect(results.toString()).not.toContain('FAILED');
    }, 12000);

    it('should scaffold an eleventy site that lints', async () => {
        const testName = 'lint';

        await exec(`node ../dist/index.js scaffold eleventy -n ${testName}`, { cwd: outDir });
        await exec(`yarn install`, { cwd: outDir });
        const results = await exec(`yarn lint`, { cwd: outDir });

        expect(results.toString()).toContain('FAILED');
    }, 12000);
});

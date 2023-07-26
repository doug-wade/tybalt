import { describe, it, expect } from '@jest/globals';
import child_process from 'node:child_process';
import path from 'node:path';
import packageJson from "../package.json"

describe('cli', () => {
    it('should emit the version', () => {
        const binScriptPath = path.resolve(`${__dirname}/../src/index.ts`);
        const results = child_process.execSync(`npx ts-node-esm ${binScriptPath} --version`);

        expect(results.toString()).toEqual(`${packageJson.version}\n`);
    });
});

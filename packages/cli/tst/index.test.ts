import { describe, it, expect } from '@jest/globals';
import child_process from 'node:child_process';
import path from 'node:path';

describe('cli', () => {
    it('should emit the version', () => {
        const binScriptPath = path.resolve(`${__dirname}/../src/index.ts`);
        const tsNodePath = path.resolve(`${__dirname}/../node_modules/.bin/ts-node-esm`);
        const results = child_process.execSync(`node ${tsNodePath} ${binScriptPath} --version`);

        expect(results.toString()).toEqual('0.0.1\n');
    });
});

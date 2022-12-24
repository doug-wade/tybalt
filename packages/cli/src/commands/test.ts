import type { CommandContext } from '../types';

import { resolve } from 'import-meta-resolve';

import child_process from 'node:child_process';
import path from 'node:path';
import url from 'node:url';

export default ({ program }: CommandContext) => {
    program
        .command('test')
        .description('test a component or components')
        .option('--coverage', 'whether to generate test coverage', false)
        .argument('[string]', 'pattern', '')
        .action(async (pattern: string) => {
            const __filename = url.fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.resolve(`${__dirname}../../../config/jest.config.js`);

            console.log(filePath);

            const results = child_process.spawnSync(
                'npx',
                ['--node-options="--experimental-vm-modules"', 'jest', `--config=${filePath}`, pattern],
                {},
            );

            console.log(results.stdout.toString());
            console.error(results.stderr.toString());
        });
};

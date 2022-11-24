import type { CommandContext } from '../types';

import child_process from 'node:child_process';
import path from 'node:path';
import url from 'node:url';

export default ({ program }: CommandContext) => {
    program.command('test')
        .description('test a component or components')
        .argument('[string]', 'pattern', '')
        .action(async (pattern: string) => {
                const __filename = url.fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const filepath = path.resolve(`${__dirname}../../../config/jest.config.js`);

                const jestPath = require.resolve('jest');
                const results = child_process.spawn('node', ['--experimental-vm-modules', url.fileURLToPath(jestPath), `--config=${filepath}`, pattern], {});

                results.stdout.pipe(process.stdout);
                results.stderr.pipe(process.stderr);
        });
};
import type { CommandContext } from '../types';

import child_process from 'node:child_process';
import path from 'node:path';

export default ({ program }: CommandContext) => {
    program.command('test')
        .description('test a component or components')
        .argument('[string]', 'pattern', '')
        .action(async (pattern: string) => {
            const filepath = path.resolve(`${__dirname}../../../config/jest.config.js`);
            const jestPath = require.resolve('jest');
            const results = child_process.spawn('node', ['--experimental-vm-modules', jestPath, `--config=${filepath}`, pattern], {});

            results.stdout.pipe(process.stdout);
            results.stderr.pipe(process.stderr);
        });
};
import type { CommandContext } from '../types.js';

import child_process from 'node:child_process';
import path from 'node:path';
import url from 'node:url';
import { resolve } from 'import-meta-resolve';

export default ({ program }: CommandContext) => {
    program
        .command('lint')
        .description('lint a component or components')
        .argument('[string]', 'pattern', 'src/**/*.ts')
        .action(async (pattern) => {
            const __filename = url.fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.resolve(`${__dirname}../../../config/.eslintrc.cjs`);
            const eslintRootDirectory = url.fileURLToPath(await resolve(`eslint`, import.meta.url));
            const eslintBinPath = path.resolve(`${eslintRootDirectory}../../../bin/eslint.js`);

            const results = child_process.spawnSync('node', [eslintBinPath, `--config=${filePath}`, pattern], {});

            console.log(results.stdout.toString());
            console.error(results.stderr.toString());
        });
};

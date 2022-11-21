import { transform } from "@swc/core";
import glob from 'glob';
import mkdirp from 'mkdirp';
import fs from 'node:fs';
import path from 'node:path';

import type { CommandContext } from '../types';

const globPromise = (pattern: string, options = {}): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) => err === null ? resolve(files) : reject(err))
  })
}

export default ({ program }: CommandContext) => {
    program.command('build')
        .description('build a component or components')
        .argument('[string]', 'pattern', 'src/**/*.component.{ts,js}')
        .option('-d, --directory <string>', 'the output directory', 'dist')
        .action(async (pattern: string, options) => {
            const files = await globPromise(pattern);

            if (!files.length) {
              console.error(`pattern ${pattern} did not match any files`);
            }

            files.forEach(async (filename) => {
              console.log(`compiling file ${filename}`);
              const sourceCode = await fs.promises.readFile(filename);
              const output = await transform(String(sourceCode), { filename });
              const outFilename = filename.replace('src', options.directory);
              await mkdirp(path.dirname(outFilename));
              fs.promises.writeFile(outFilename, output.code);
            });
        });
};
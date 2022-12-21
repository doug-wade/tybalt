import esbuild from "esbuild";
import htmlPlugin from '@chialab/esbuild-plugin-html';
import tybaltPlugin from '@tybalt/esbuild-plugin';

import type { CommandContext } from '../types';

export default ({ program }: CommandContext) => {
    program.command('build')
        .description('build a component or components')
        .argument('[string]', 'pattern', 'src/index.html')
        .option('-o, --outdir <string>', 'the output directory', 'dist')
        .action(async (pattern: string, options) => {
          esbuild.build({
              bundle: true,
              entryPoints: [pattern],
              outdir: options.outdir,
              assetNames: 'assets/[name]-[hash]',
              chunkNames: '[ext]/[name]-[hash]',
              plugins: [
                  htmlPlugin(),
                  tybaltPlugin()
              ],
          });
        });
};
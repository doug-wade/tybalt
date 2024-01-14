import type { PluginBuild } from 'esbuild';

import fs from 'node:fs';
import path from 'node:path';

const namespace = 'tybalt-styles';

export default () => ({
    name: 'tybalt',
    setup(build: PluginBuild) {
        build.onResolve({ filter: /.*\.css$/ }, (args) => {
            return {
                path: path.resolve(args.resolveDir, args.path),
                namespace,
            };
        });

        build.onLoad({ filter: /.*/, namespace }, async (args) => {
            const contents = await fs.promises.readFile(args.path);
            return {
                contents,
                loader: 'text',
            };
        });
    },
});

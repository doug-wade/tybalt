import type { PluginBuild } from 'esbuild';

import fs from "node:fs";
import path from "node:path";

export default () => ({
  name: "tybalt",
  setup(build: PluginBuild) {
    build.onResolve({ filter: /.*\.css$/ }, (args) => {
      return {
        path: path.resolve(args.resolveDir, args.path),
        namespace: "tybalt-styles",
      };
    });

    build.onLoad({ filter: /.*/, namespace: "tybalt-styles" }, async (args) => {
      const contents = await fs.promises.readFile(args.path);
      return {
        contents,
        loader: "text",
      };
    });
  },
});

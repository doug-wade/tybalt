const fs = require("node:fs");
const path = require("node:path");

module.exports = () => ({
  name: "tybalt",
  setup(build) {
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

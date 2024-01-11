---
layout: layout.html
title: Building
---

# Building

## Using the cli

The easiest way to get started building your project is to use the tybalt cli with npx.

```shell
npx @tybalt/cli build
```

However, if you will have many collaborators on a project, you'll likely want to standardize your build step, especially if you have to set flags or options when building your project.

First, install the cli

```shell
yarn add -D @tybalt/cli
```

You can also add a new script to your package.json

```json
{
    "scripts": {
        "build": "tybalt build"
    }
}
```

Now you can run the build using `yarn run build`.

You can see the [cli documentation](/pages/cli) for more details on how to use the cli to build your project, like how to specify entry points or the output directory.

## Using the esbuild plugin

For more complex projects, such as projects that want to use css preprocessors, you'll need to set up your build to use `@tybalt/esbuild-plugin` instead of using the cli.

First, install the dependencies

```shell
yarn add -D esbuild @tybalt/esbuild-plugin
```

Then create a new file, such as `scripts/build.js`, to house your new build script

```js
import tybaltPlugin from '@tybalt/esbuild-plugin';
import esbuild from 'esbuild';

esbuild.build({
    bundle: true,
    entryPoints: ['path/to/my/entry-points/*.ts'],
    outdir: 'path/to/my/output/directory/',
    assetNames: 'assets/[name]-[hash]',
    chunkNames: '[ext]/[name]-[hash]',
    plugins: [tybaltPlugin()],
});
```

And finally update your `package.json` to have an alias to call the new script

```json
{
    "scripts": {
        "build": "node scripts/build.js"
    }
}
```

You can see the [esbuild plugin documentation](/pages/esbuild-plugin) and in the [esbuild documentation](https://esbuild.github.io/getting-started/#build-scripts) for more details on building using the esbuild plugin with a build script.

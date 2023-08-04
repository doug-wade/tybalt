# Contributing

Thanks for helping out!

## Getting started

We use `yarn` for managing our monorepo, so first things first [install that](https://yarnpkg.com/getting-started/install).

Next, install the dependencies.

```shell
$ yarn install
```

This will also link the packages locally, so the work you do in one package is reflected in the others.

Next, compile the project.

```shell
$ yarn run build
```

And you should be ready to go! To verify that everything is working as expected, start the servers and visit the example.

```shell
$ yarn run serve
```

and visit the example at localhost:3000.

## Top-level Scripts

We use `turbo` for our monorepo scripts, which does a lot of caching for us.

### build

Run this command to compile and bundle all of the dependencies.

### clean

Run this command to remove all built files. Note that if you run this command, you'll break turbo's
caching, so you'll have to run `build` and `test` with `--force` to get things up and working again.

### format

Run this command to format the source code to match the style guide.

### generate-types

Run this command to generate all the typescript type definition files.

### serve

Run this command to start all the servers (currently, the website on 8081 and the example on 3001).

### test

Run this command to run all of the unit tests.

### watch

Run this command to start watchers for all of the packages in the monorepo. Note that the watcher
doesn't trigger cascading builds.

## How-tos

### Run a single unit test

Update the test file to use `it.only`, then run just that file

```shell
$ jest -- render
```

### Debug a unit test

Most of the packages have a debug target

```shell
$ yarn run debug
```

Then navigate to [chrome://inspect/](chrome://inspect/)

### Publish a new release

Semantic versioning allows us to publish breaking changes in minor and patch versions before we
hit 1.0.0, so currently we're versioning all of our packages in lockstep (that is, all of the
version fields for all of the packages in the monorepo should have the same version). To update
the version, do a find-and-replace of "version": "0.0.x" with the new version. We don't need to
change the declared dependencies inside the monorepo because they declare a `workspace:^`
dependency, so yarn does the updating for us. Then, draft a new release in the Github UI,
creating a new tag called v0.0.x and publish it and the CI should do the rest! To sanity check
the release, you can update [tybalt-client](https://github.com/doug-wade/tybalt-client) to the
latest version and run the tests.

## Ports

### 3000

The example package listens on port 3000.

### 3008

The eleventy plugin "vanilla" (e.g. without Tybalt) example listens on port 3008.

### 8081

The website listens on port 8081.

## Getting help

The best place to get help is to come [join the discord](https://discord.gg/FHpfstT7Dw). There is
a "contributors" channel dedicated to helping contributors.

## Common errors

We've seen a few errors in the past that you may encounter:

### Error: Cannot find module '/path/to/tybalt/packages/cli/dist/index.js'

This happens when you try to run a command like `serve` or `test` that requires the cli to have been compiled. Run `yarn run build` to compile the project.

### /bin/sh: line 1: npm: command not found

Although we use yarn, one of our dependencies, esbuild, assumes that npm is available at install time on your path. Make sure to add npm to your path or workspace.

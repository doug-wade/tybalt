# Contributing

Thanks for helping out!

## Getting started

We use `yarn` for managing our monorepo, so first things first [install that](https://yarnpkg.com/getting-started/install).

Next, install the dependencies.

```shell
$ yarn install
```

This will also link the packages locally, so the work you do in one package is reflected in the others.

## Top-level Scripts

We use `turbo` for our monorepo scripts, which does a lot of caching for us.

### build

Run this command to compile and bundle all of the dependencies.

### test

Run this command to run all of the unit tests.

### clean

Run this command to remove all built files. Note that if you run this command, you'll break turbo's
caching, so you'll have to run `build` and `test` with `--force` to get things up and working again.

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

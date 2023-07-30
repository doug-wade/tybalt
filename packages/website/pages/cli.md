---
layout: layout.html
title: Tybalt cli
---

# @tybalt/cli

Tybalt ships with a command-line application that can be used to perform common tasks associated with Tybalt projects. For example, you can scaffold a new component library, lint the source code, build the components, run the unit tests, and start a development server without setting up jest, eslint, esbuild, or fastify yourself, by running the following commands:

```shell
$ npm i -g @tybalt/cli
$ tybalt scaffold library
$ tybalt lint
$ tybalt build
$ tybalt test
$ tybalt serve
```

## Getting Started

### Recommended: Add as a dev dependency

```shell
npm i -D @tybalt/cli
```

Then, add scripts to the `scripts` key of package.json with the options you want specified

```json
{
    "scripts": {
        "start": "tybalt serve",
        "lint": "tybalt lint"
    }
}
```

### Use `@tybalt/cli` with `npx`

This is the method we use in the documentation because it just works ™️, but it can be slow.

```shell
$ npx @tybalt/cli build
```

### Install the cli globally

This isn't very safe because it gives access to some global folders when installing.

```shell
$ npm i -g @tybalt/cli
```

## Commands

Each command responds to `--help` and returns an extended help message with all of the available options documented.

For instance, the help message for scaffold is, at time of writing:

```shell
» npx @tybalt/cli scaffold --help
Usage: @tybalt/cli scaffold [options] [string]

scaffold tybalt-related files

Arguments:
  string                whether to create a project or a component (default: "component")

Options:
  -n, --name <string>   tybalt-example
  -s, --styles          whether to generate a separate css file (default: true)
  -t, --tests           whether to generate unit tests (default: true)
  -i, --implementation  whether to generate a component implementation file (default: true)
  -h, --help            display help for command                     
```

You can also run `--version` to get the current version number.

### build

Builds an application using esbuild.

The first argument is the entrypoint to build (defaults to `src/index.html`)

```shell
$ npx @tybalt/cli build
```

### lint

Lints the project using eslint and some reasonable defaults.

```shell
$ npx @tybalt/cli lint
```

### scaffold

Scaffolds a new project. 

Must be provided with a project type, one of: `eleventy`, `fastify`, `component` or `library`, as the first argument.

Must also have a name, provided with the `-n, --name` flag.

```shell
$ npx @tybalt/cli scaffold eleventy -n tybalt-website
```

### serve

Serves an application

```shell
$ npx @tybalt/cli serve
```

### test

Runs the unit tests for a project.

```shell
$ npx @tybalt/cli test
```

### watch

Runs the build every time a change is detected.

```shell
$ npx @tybalt/cli watch
```

---
layout: layout.html
title: Creating a new website
---

# Creating a new website

First, you'll need to decide what kind of website you want to use. Tybalt works well both in CSR (client-side rendered) and SSG (static site generated) application, and we provide scaffolding for either, using fastify and eleventy respectively. If you want to serve your website from a static hosting solution, like netlify or s3, you'll want to use the `eleventy` scaffold; if you want to host a running process on a server, use the `fastify` scaffold.

Once you've decided, run the scaffolding for the appropriate scaffold

```shell
npx @tybalt/cli scaffold eleventy --name my-website-name

# OR

npx @tybalt/cli scaffold fastify --name my-website-name
```

Luckily, both scaffolds are supported the same by the cli. Save it locally

```shell
npm i -D @tybalt/cli
```

And edit your package.json to set up a few basic tasks

```json
{
    "scripts": {
        "build": "tybalt build",
        "lint": "tybalt lint",
        "test": "tybalt test",
        "start": "tybalt serve",
        "watch": "tybalt watch",
        "prepare": "npm run lint && npm run build && npm run test"
    }
}
```

To see your example site, run `npm run serve` and navigate to 

You can now run the following commands

```shell
npm test
```

This will run the unit tests, which are found in files with the extension `.test.ts`. For more details, see the "writing unit tests" guide.

```shell
npm start
```

This will start a local development server, and serve your application on port 3000. Generally, you want to run `npm run watch` while you have a server running with `npm start` so that you always get the latest version of your statics.

```shell
npm run build
```

This compiles your statics to make them ready to serve.

```shell
npm run lint
```

This will perform static analysis, which is checking your code for bugs.

```shell
npm run watch
```

This will start a watcher, which detects changes to your files and calls `npm run build` automatically.

This will also set up a `prepare` script, which describes the steps necessary to get a package ready for use.

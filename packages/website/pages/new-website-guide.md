# Creating a new website

First, run the scaffolding

```shell
$ npx @tybalt/cli scaffold eleventy --name my-website-name
```

The save the cli locally

```shell
$ npm i -D @tybalt/cli
```

And edit your package.json to set up a few basic tasks

```json
{
  "scripts": {
    "build": "tybalt build",
    "lint": "tybalt lint",
    "test": "tybalt test",
    "serve": "tybalt serve",
    "prepare": "npm run lint && npm run build && npm run test"
  }
}
```
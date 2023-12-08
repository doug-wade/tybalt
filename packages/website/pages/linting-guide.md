---
layout: layout.html
title: Events
---

# Linting

## Using the tybalt cli

The easiest way to get set up with linting your project is using the Tybalt cli. You can use [npx](https://docs.npmjs.com/cli/v8/commands/npx) to lint your files

```shell
npx @tybalt/cli lint
```

However, if you will have many collaborators on a project, you'll likely want to standardize your lint step. First, install the cli

```shell
yarn install -D @tybalt/cli
```

You can also add a new script to your package.json

```json
{
    "scripts": {
        "lint": "tybalt lint"
    }
}
```

Now you can run the linter using `npm run lint`.

You can see the [cli documentation](/pages/cli) for more details on setting up linting using the cli.

## Using @tybalt/eslint-plugin

For more complex projects, you'll likely need to do customization to your linting setup that is more complex than is available with the tybalt cli. For these cases, you'll want to use the eslint plugin.

To get started, install the plugin and associated dependencies

```shell
yarn add -D eslint @tybalt/eslint-plugin
```

Then create an `.eslintrc.js` file that contains, at a minimum

```javascript
module.exports = {
    extends: ['plugin:@tybalt/eslint-plugin/ts-recommended'],
    plugins: ['@tybalt/eslint-plugin'],
};
```

And finally add a script to your `package.json`

```json
{
    "scripts": {
        "lint": "tybalt lint"
    }
}
```

And now you can run `npm run lint` to lint your code!

You can see the [eslint plugin documentation](/pages/eslint-plugin) for more details on setting up linting using the eslint plugin.

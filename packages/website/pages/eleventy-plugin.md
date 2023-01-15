---
layout: layout.html
title: Tybalt test utils
---

## Installation

Install the eleventy plugin with your favorite npm client

```shell
npm install --save-dev @tybalt/eleventy-plugin
```

## Getting Started

First, go through the [11ty Getting Started guide](https://www.11ty.dev/docs/getting-started/).

Next, you'll need to configure the plugin in `.eleventy.js` with the location of your component definitions

```javascript
const tybaltPlugin = require('@tybalt/eleventy-plugin');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(tybaltPlugin, {
        components: ['./components'],
    });
};
```

## Usage

The plugin makes the components available for use on all of your pages. If you have a component defined like this

```javascript
defineComponent({
    name: 'FooBarBaz',
    props: {
        value: {},
    },
});
```

You can use it on your index.html or page.md like any other html element

```html
<foo-bar-baz value="value"></foo-bar-baz>
```

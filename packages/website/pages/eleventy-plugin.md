---
layout: layout.html
title: Tybalt eleventy plugin
---

# @tybalt/eleventy-plugin

Tybalt uses eleventy for static site generation.

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
        pattern: './components',
        outfile: 'tybalt-out.js',
    });
};
```

## Usage

The plugin makes your component library available for use on all of your pages. If you have a component defined like this

```javascript
defineComponent({
    name: 'FooBarBaz',
    props: {
        value: {},
    },
    render({ value }) {
        return html`got value: ${value}`;
    })
});
```

You can use it on your index.html or page.md like any other html element

```html
<foo-bar-baz value="value"></foo-bar-baz>
```

## Options

The plugin takes a pair of options to configure its usage

### outfile

This is the name of the file the plugin will generate that contains your component library. It defaults to `tybalt-out.js`, but you can configure it to be any valid filename. For instance, if you set this option as follows

```javascript
const tybaltPlugin = require('@tybalt/eleventy-plugin');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(tybaltPlugin, {
        outfile: 'index.js',
    });
};
```

The generated view will include a script tag as follows

```html
<script src="/index.js"></script></body></html>
```

And the file loaded by the browser and generated by the build will be called `index.js`, rather than `tybalt-out.js`.

### pattern

This is the pattern for the component definitions that will be included in your component library. Defaults to `./components`, which corresponds to a file tree as follows

```shell
└── components
    ├── component-one.js
    ├── component-two.js
    └── component-three.js
```

where each component is a single file. If you'd prefer to have multiple files in a single directory, you could set this to `./components/**/*.component.ts`, to treat all files ending in `.component.ts` as entry points, which corresponds to a file tree as follows

```shell
├── components
│   ├── ComponentOne
│   │   ├── one.component.ts
│   │   ├── one.test.ts
│   │   └── one.css
│   ├── ComponentTwo
│   │   └── two.ts
│   └── ComponentThree
│       ├── header.ts
│       └── header.css
```

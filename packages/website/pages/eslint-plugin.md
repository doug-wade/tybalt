---
layout: layout.html
title: Tybalt eslint plugin
---

# @tybalt/eslint-plugin

Tybalt uses eslint for linting.

## Installation

Install the plugin with your favorite package manager

```shell
npm i -D @tybalt/eslint-plugin
```

## Getting Started

The best way to get started is to extend our recommended rule set. For example, in `.eslintrc.cjs`:

```javascript
module.exports = {
    extends: ['@tybalt/eslint-plugin/ts-recommended'],
};
```

## Available rules

We currently only have one rule, but we plan to add more!

### Component names are multi-word

Checks to make sure that your component has a multi-word name (a name that contains an en-dash `-`). This is a requirement [from the spec](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name).

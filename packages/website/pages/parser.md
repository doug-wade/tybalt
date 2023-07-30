---
layout: layout.html
title: Tybalt parser
---

# @tybalt/parser

Tybalt's package for parsing web component attributes

## Installation

Install the parser with your favorite npm client

```shell
npm install --save @tybalt/parser
```

## Usage

```js
import { objectParser } from '@tybalt/parser';

defineComponent({
  props: {
    option: {
      parser: objectParser
    }
  }
})
```

## Api

### objectParser

### booleanParser

### arrayParser

### numberParser

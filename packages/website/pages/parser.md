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
import { object } from '@tybalt/parser';

defineComponent({
  props: {
    option: {
      validator: (obj) => !!obj.requiredKey
      parser: object
    }
  }
})
```

## Api

There are four parsers currently: `boolean`, `json`, `number`, `string`.

### object

```js
import { object } from '@tybalt/parser';

defineComponent({
  props: {
    option: {
      parser: object
    }
  }
})
```

### boolean

```js
import { boolean } from '@tybalt/parser';

defineComponent({
  props: {
    option: {
      parser: boolean
    }
  }
})
```

### array

```js
import { array } from '@tybalt/array';

defineComponent({
  props: {
    option: {
      parser: array
    }
  }
})
```

### number

```js
import { number } from '@tybalt/array';

defineComponent({
  props: {
    option: {
      parser: number
    }
  }
})
```

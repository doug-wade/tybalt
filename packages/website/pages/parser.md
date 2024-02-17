---
layout: layout.html
title: Tybalt parser
---

# @tybalt/parser

Tybalt's package for parsing web component attributes.

## Motivation

All web component attribute values are strings, because that's how html works. However, this is inconvenient sometimes for programming, where it can be easier to work with more complex data types, like objects.

Tybalt does its best to parse what it thinks you intend to pass using the `standard` parser. If you pass the string `true` or `false`, it will assume that you intend to pass a boolean, rather than a string. This can be problematic, for instance when you do want to pass the string "true" or "false". To handle these cases, the parser package exports a variety of parsers to match common data types that are passed in attributes between custom elements.

## Installation

Install the parser with your favorite npm client

```shell
npm install --save @tybalt/parser
```

## Usage

To use a new parser, import it and pass it as the `parser` key on a prop definition as follows

```js
import { json } from '@tybalt/parser';

defineComponent({
  props: {
    option: {
      validator: (obj) => !!obj.requiredKey
      parser: json
    }
  }
})
```

Now, when your custom element gets a new value passed to it, the value will be parsed using the custom parser.

## Api

There are five parsers currently: `boolean`, `json`, `number`, `standard`, and `string`.

### boolean

This parser supports tri-state booleans, and returns `null` for all values other than `true` and `false`.

```js
import { boolean } from '@tybalt/parser';

defineComponent({
    props: {
        option: {
            parser: boolean,
        },
    },
});
```

### json

This parser assumes the contents of the attribute string are valid json, and then calls `JSON.parse` on the contents and passes the resulting object.

```js
import { json } from '@tybalt/parser';

defineComponent({
    props: {
        option: {
            parser: json,
        },
    },
});
```

### number

This parser returns a number from its string representation.

```js
import { number } from '@tybalt/parser';

defineComponent({
    props: {
        option: {
            parser: number,
        },
    },
});
```

### standard

This is the standard parser used by Tybalt components. It makes its best guess, bless its heart, but it is kinda dumb sometimes.

```js
import { standard } from '@tybalt/parser';

defineComponent({
    props: {
        option: {
            parser: standard,
        },
    },
});
```

### string

Returns the string value passed to the web component attribute directly, as-is. The identity function of web component attribute parsers.

```js
import { string } from '@tybalt/parser';

defineComponent({
    props: {
        option: {
            parser: string,
        },
    },
});
```

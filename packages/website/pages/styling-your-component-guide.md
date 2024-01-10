---
layout: layout.html
title: Styling your component
---

The first thing to do when styling your component is to decide what method you want to use to add styles. The options are:

-   render function
-   css file
-   inline string

If you're just adding a little bit of style, the inline string is probably your best solution. A standalone css file can be nice if you highly value the separation of concerns. A render function is needed if your styles are derived from data, like props, or something fetched from an api.

## .css file

This is the solution I reach for first. You can `import` the css file if you're using `@tybalt/esbuild-plugin` or `@tybalt/cli` to build your project, and then hand it directly to the css property on `defineComponent`.

```js
import { defineComponent, html } from '@tybalt/core';
import css from './index.css';

export default defineComponent({
    css,
    render() {
        return html`<div class="my-class">hello world</di>`;
    },
});
```

## Inline strings

You can similarly pass a string of css directly to the `css` property on the `defineComponent` options object. This is good for fast solutions.

```js
import { defineComponent, html } from '@tybalt/core';

export default defineComponent({
    css: `
        .my-class {
            color: rebeccapurple;
        }
    `,
    render() {
        return html`<div class="my-class">hello world</di>`;
    },
});
```

## Render function

The final option is that you can pass a function to `css` to give it a chance to re-render each time the `render` function is called

```js
import { defineComponent, html } from '@tybalt/core';

export default defineComponent({
    css({ customColor }) {
        return `
            .my-class {
                color: ${customColor};
            }
        `;
    },
    render() {
        return html`<div class="my-class">hello world</di>`;
    },
    props: {
        customColor: {
            validator: string(),
        },
    },
});
```

This can lead to a lot of "thrash" for the style and layout rendering, so be sparing in its use.

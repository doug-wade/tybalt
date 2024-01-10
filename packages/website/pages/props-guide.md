---
layout: layout.html
title: Props
---

# Props

Dom elements can have attributes set on them. You can transform an attribute into a prop by specifying
some data about it with the props config object passed to `defineComponent`.

```javascript
defineComponent({
    props: { example: {} },
});
```

All props are passed as reactives with the same name as the first argument to setup. Each reactive
is notified when the corresponding attribute changes.

```javascript
defineComponent({
    props: {
        example: {},
    },
    setup({ example }) {
        assert(example instanceof Reactive);
    },
});
```

Props can have a default value that is provided if the attribute is unset.

```javascript
defineComponent({
    props: {
        example: {
            default: 'tybalt',
        },
    },
});
```

Props can also have a validator. Validation errors are pushed to the error stream of the Reactive.

```javascript
defineComponent({
    props: {
        example: {
            validator: oneOf(['foo', 'bar', 'baz']),
        },
    },
    setup({ example }) {
        example.addListener((nextValue) => {
            // TODO: What do we for error streams for reactives???
        });
    },
});
```

To create derived state from a prop, you should create a new reactive, and then update it with the
derived value.

```javascript
{
  props: {
    name: { validator: string() }
  },
  setup({ name }) {
    const greeting = reactive(`hello ${name}`);

    return { greeting };
  }
}
```

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

All props are passed as observables with the same name as the first argument to setup. Each observable
is notified when the corresponding attribute changes.

```javascript
defineComponent({
    props: {
        example: {},
    },
    setup({ example }) {
        assert(example instanceof Observable);
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

Props can also have a validator. Validation errors are pushed to the error stream of the observable.

```javascript
defineComponent({
    props: {
        example: {
            validator: oneOf(['foo', 'bar', 'baz']),
        },
    },
    setup({ example }) {
        example.subscribe({
            error(err) {
                alert(err);
            },
        });
    },
});
```

To create derived state from a prop, you should create a new observable, and then update it with the
derived value.

```javascript
{
  props: {
    name: { validator: string() }
  },
  setup({ name }) {
    const greeting = new BehaviorSubject(`hello ${name}`);

    return { greeting };
  }
}
```
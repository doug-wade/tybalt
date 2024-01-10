---
layout: layout.html
title: Custom Validator Guide
---

To enforce constraints in Tybalt, we have validators. A validator is a plain-old javascript object with a method called `validate` that takes a string. For example, you can have a validator that allows all values as follows

```js
{ validate() { return true; } }
```

For our example, we want to check the value is divisible by 8

```js
{ validate(val) { return val % 8 === 0; } }
```

You can also return other metadata on a validator by with the with\* methods, like `withMessage` and `withLevel`. For instance, to set our log level to warn and add a message, we would wrap our validator as follows

```js
withMessage(
    withLevel(
        {
            validate(val) {
                return val % 8 === 0;
            },
        },
        'warning',
    ),
    'value must be divisible by 8',
);
```

This ends up creating a validator which looks like this

```json
{
  validate(val) { return val % 8 === 0; },
  message: 'value must be divisible by 8',
  level: 'warn'
}
```

But please use the `with*` methods so we can move the message and level to a symbol or different key if we need in the future.

Finally, if you find yourself creating many similar validators, you can create a factory. Say, for instance, we now need to support divisible by 10 too. We could create a factory

```js
const divisibleBy = (divisor) => {
  return withMessage(
    withLevel({
      validate(val) { return val % divisor === 0; }
    }, 'warning'),
  `value must be divisible by ${divisor}`
)
```

Which can be used as follows

```js
defineComponent({
    props: {
        size: {
            validator: compose(number(), divisibleBy(10)),
        },
    },
});
```

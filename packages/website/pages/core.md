---
layout: layout.html
title: Tybalt core
---

# @tybalt/core

## Getting started

Install the package

```shell
$ npm install --save @tybalt/core
```

## Guide

### Props

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

### Slots

There are `slot` and `template` elements in javascript that work well with web components.

```javascript
defineComponent({
    name: 'slot-example',
    shadowMode: 'open',
    template: `
    <div class="my-class">
      <span>Example: </span>
      <slot name="content"></slot>
    </div>
  `,
});
```

When you render a `slot-example` component, it will replace the `slot` element with the children
of the `slot-example` component. A component rendered in the DOM as

```html
<slot-example>
    <div my-attribute="foo">example content</div>
</slot-example>
```

Would be rendered to the user as

```html
<div class="my-class">
    <span>Example: </span>
    <div my-attribute="foo">example content</div>
</div>
```

## API

### defineComponent

`defineComponent` creates a new web component.

#### name

The name of the web component. This is used when creating a new instance of your web component.
For instance, if you create a new component with the name `my-component`

```javascript
defineComponent({
    name: 'my-component',
});
```

you can use it in your html with the same name

```html
<my-component />
```

Note that component names have to contain the `-` character.

#### emits

emits is an array of strings, which are the [CustomEvent types](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#parameters) of all of the events this component might emit.
This is used for static analysis purposes; if you emit an event that is not listed here or if you don't list an event here that you later emit it's totally fine.

```javascript
defineComponent({
    name: 'emits-example',
    emits: ['my-event'],
});
```

#### props

props is an object that determines how attributes are handled for your web component.

```javascript
import { required, string } from '@tybalt/validator';

defineComponent({
    name: 'props-example',
    props: {
        example: {
            default: 'foo',
            validator: compose(required(), string()),
        },
    },
});
```

#### setup

`setup` is a method that is called once a web component is connected to the DOM (it is called as part of
`connectedCallback`, once all of the props has been supplied).

```javascript
defineComponent({
    name: 'setup-script',
    setup(props) {
        return {
            myValue: 'my-value',
        };
    },
});
```

#### connectedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
    name: 'connected-callback',
    connectedCallback() {
        console.log('connected to the dom');
    },
});
```

#### disconnectedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
    name: 'disconnected-callback',
    disconnectedCallback() {
        console.log('disconnected from the dom');
    },
});
```

#### adoptedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
    name: 'adopted-callback',
    adoptedCallback() {
        console.log('adopted to the dom');
    },
});
```

#### shadowMode

The mode that the [shadow root mode](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)
the dom should be attached in. One of: open, closed.

```javascript
defineComponent({
    name: 'shadow-mode',
    shadowMode: 'open',
});
```

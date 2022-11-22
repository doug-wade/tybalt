# @tybalt/core

## Getting started

Install the package

```shell
$ npm install --save @tybalt/core
```

## API

### defineCompnent

`defineComponent` creates a new web component.

#### name

The name of the web component. This is used when creating a new instance of your web component.
For instance, if you create a new component with the name `my-component`

```javascript
defineComponent(
    name: 'my-component'
);
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
    name:
});
```

#### props

props is an object that determines how attributes are handled for your web component.

```javascript
import { required, string } from "@tybalt/validator";

defineComponent({
  name: "props-example",
  props: {
    example: {
      default: "foo",
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
  name: "setup-script",
  setup(props) {
    return {
      myValue: "my-value",
    };
  },
});
```

#### connectedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
  name: "connected-callback",
  connectedCallback() {
    console.log("connected to the dom");
  },
});
```

#### disconnectedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
  name: "disconnected-callback",
  disconnectedCallback() {
    console.log("disconnected from the dom");
  },
});
```

#### adoptedCallback

Called as part of the [web component life cycle](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks).

```javascript
defineComponent({
  name: "adopted-callback",
  adoptedCallback() {
    console.log("adopted to the dom");
  },
});
```

#### shadowMode

The mode that the [shadow root mode](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode)
the dom should be attached in. One of: open, closed.

```javascript
defineComponent({
  name: "shadow-mode",
  shadowMode: "open",
});
```

### useObservable

Creates a new core-js observable (tc39 stage 1)

```javascript
const { observable, handler } = useObservable();
```

#### initialValue

Sets the initial value of the observable.

```javascript
const { observable, handler } = useObservable({ initialValue: 0 });
```

#### subscriber

A subscriber to attach to the observable.

```javascript
const { observable, handler } = useObservable({
  subscriber: (val) => {
    console.log(val);
  },
});
```

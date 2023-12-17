---
layout: layout.html
title: Tybalt reactive
---

# @tybalt/reactive

Tybalt's package for reactivity

## Installation

Install the parser with your favorite npm client

```shell
npm install --save @tybalt/reactive
```

## Usage

To create a new reactive, call the `reactive` function with its initial value

```js
import { reactive } from '@tybalt/reactive';

const myReactive = reactive(42);
```

To attach a new listener to a reactive, use its `addListener` method

```js
myReactive.addListener((newValue) => console.log('got a new value:', newValue));
myReactive.value = 'quux'; // logs "got a new value: quux"
```

When you want to set a new value, update it using the `.value` key on the reactive

```js
myReactive.value = 74;
```

If you would like to create a new reactive that is derived from another reactive, use the `derive` function

```js
const myReactive = reactive('hello');
const myDerivedReactive = derive(myReactive, ([value]) => {
    return `${value} world`;
});
console.log(myDerivedReactive.value); // logs "hello world"

myReactive.value = 'bonjour';

console.log(myDerivedReactive.value); // logs "bonjour world"
```

## Api

There are two functions exported by reactive currently: `reactive` and `derive`. Both return a `Reactive`, which has two public members, `value` and `addListener`.

### derive

This method is used for creating a new reactive that is automatically updated to match the state of one or more other upstream reactives. It takes as arguments first the reactive or array of reactives that you want to monitor, and then second it takes a callback that is executed every time that one of the upstream reactives changes with the most recent values of all reactives.

```js
import { derive } from '@tybalt/reactive';

const value = 'first half';
const anotherValue = 'second half';
const mockReactive = reactive(value);
const anotherReactive = reactive(anotherValue);

const derivation = derive([mockReactive, anotherReactive], ([firstReactive, secondReactive]) => {
    return `${firstReactive.value} + ${secondReactive.value}`;
});

console.log(derivation.value); // logs "first half + second half"
```

### reactive

This method is used for creating a new reactive. It takes as an argument the initial value of the reactive.

```js
import { reactive } from '@tybalt/reactive';

const myReactive = reactive('foo');
console.log(myReactive.value); // logs "foo"
myReactive.value = 'bar';
console.log(myReactive.value); // logs "bar"
```

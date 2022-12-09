---
layout: layout.html
title: Tybalt test utils
---

# @tybalt/test-utils

## Installation

```shell
$ npm install --save-dev @tybalt/test-utils
```

## Usage

```javascript
import { mount } from "@tybalt/test-utils";
import MyComponent from "./my-component";

describe("component", () => {
  it("renders", async () => {
    const wrapper = await mount(MyComponent);

    expect(wrapper.html()).toBe(`<my-component></my-component>`);
  });
});
```

## Api

### flushPromises

```javascript
await flushPromises();
```

```javascript
import { flushPromises, mount } from "@tybalt/test-utils";
import MyComponent from "./my-component";

describe("component", () => {
  it("renders", async () => {
    const wrapper = await mount(MyComponent);

    // wait for asynchronous action, like a fetch request, that is performed when mounting to be completed
    await flushPromises();

    expect(wrapper.text()).toBe(`<expected content>`);
  });
});
```

### mount

Use `mount` to create an instance of a web component.

`mount` takes two arguments, the component definition, and an optional `options` object that can have
an attributes and slot key on it. The attributes argument is an object in the shape
`{ attributeKey: "attributeValue" }`, and the slot is a string of html that should be place inside the
web component.

```javascript
import { mount } from "@tybalt/test-utils";
import MyComponent from "./my-component";

describe("component", () => {
  it("renders", async () => {
    const attributes = {};
    const slot = "this is slot content";
    const wrapper = await mount(MyComponent, { attributes, slot });

    expect(wrapper.html()).toBe(`<my-component></my-component>`);
  });
});
```

### wrapper

```javascript
export interface Wrapper {
  find(selector: string): Wrapper | never;
  findAll(selector: string): Wrapper | never;
  findComponent(definition: CustomElementConstructor): Wrapper | never;
  findComponentAll(definition: CustomElementConstructor): Wrapper | never;
  html(): string | never;
  text(): string | null | never;
  attributes(attributeName?: T): NamedNodeMapOrString<T>;
  classes(className?: T): DOMTokenListOrBoolean<T>;
  exists(): boolean;
  trigger(type: string, payload?: any): void;
}
```

```javascript

```

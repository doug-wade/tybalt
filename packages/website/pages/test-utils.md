---
layout: layout.html
title: Tybalt test utils
---

# @tybalt/test-utils

The test-utils package is for unit testing web components. It's built specifically for Tybalt, but it works for most web component frameworks -- see our Lit example on GitHub.

A simple test might look like

```js
it('emits a click event when the button is clicked', async () => {
    const wrapper = await mountCookieBanner();

    const actual = wrapper.find('button');
    actual.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
});
```

See the API section below for more examples.

## Installation

```shell
npm install --save-dev @tybalt/test-utils
```

## Setup

You'll need to add the setup script to your `jest.config.js`.

In commonjs

```javascript
module.exports = {
    setupFilesAfterEnv: ['./node_modules/@tybalt/test-utils/dist/cjs/setup.js'],
};
```

In esm

```javascript
export default {
    setupFilesAfterEnv: ['./node_modules/@tybalt/test-utils/dist/mjs/setup.js'],
};
```

## Usage

```javascript
import { mount } from '@tybalt/test-utils';
import MyComponent from './my-component';

describe('component', () => {
    it('renders', async () => {
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
import { flushPromises, mount } from '@tybalt/test-utils';
import MyComponent from './my-component';

describe('component', () => {
    it('renders', async () => {
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
import { mount } from '@tybalt/test-utils';
import MyComponent from './my-component';

describe('component', () => {
    it('renders', async () => {
        const attributes = {};
        const slot = 'this is slot content';
        const wrapper = await mount(MyComponent, { attributes, slot });

        expect(wrapper.html()).toBe(`<my-component></my-component>`);
    });
});
```

### wrapper

The wrapper is a convenience class for testing DOM elements. Wrapper is an interface that has multiple implemenetations,
and is returned from methods like `find`, `mount` and `findComponentAll`.

#### attributes

The attributes method is used to get the value of attributes that are passed to an element. It takes a single, optional
parameter, `attributeName`, the name of the attribute to get the value for.

```javascript
const attributeName = 'name';
const attributeValue = 'value';

const wrapper = mount(MyComponent, { [attributeName]: attributeValue });

expect(wrapper.attributes(attributeName)).toBe(attributeValue);
```

If the optional parameter is not provided, instead an object is returned where the keys are all of the attributes, and
their corresponding values are the attribute values.

```javascript
const attributeName = 'name';
const attributeValue = 'value';

const wrapper = mount(MyComponent, { [attributeName]: attributeValue });

expect(wrapper.attributes()).toBe({ [attributeName]: attributeValue });
```

#### classes

The classes method is used to indicate the presence of classes that are present on an element. It takes a single,
optional parameter, `className`, the name of the attribute to check for the presence of.

```javascript
const className = 'my-class';
const MyComponent = defineComponent({
    render() {
        return html`<div class="${className}"></div>`;
    },
});

const wrapper = mount(MyComponent);

expect(wrapper.classes(className)).toBeTruthy();
```

If the optional parameter is not provided, instead an object is returned where the keys are all of the attributes, and
their corresponding values are the attribute values.

```javascript
const className = 'my-class';
const MyComponent = defineComponent({
    render() {
        return html`<div class="${className}"></div>`;
    },
});

const wrapper = mount(MyComponent);

expect(wrapper.classes()).toBe({ [className]: true });
```

#### exists

Indicates whether an element exists or not.

For example, if you call this method on the result of a `mount` call, it will return `true` because `mount` returns
an element.

```javascript
const wrapper = mount(MyComponent);

expect(wrapper.exists()).toBeTruthy();
```

If, instead, you query the result for a element that is not present, it will return `false`.

```javascript
const MyComponent = defineComponent({
    render() {
        return html`<div>Hello World</div>`;
    },
});

const wrapper = mount(MyComponent);
const element = wrapper.find('button');

expect(element.exists()).not.toBeTruthy();
```

#### find

Finds an element that is a descendant of this wrapper that matches a
[CSS selector string](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors).
Only returns the first element matching the selector.

```javascript
const MyComponent = defineComponent({
    render() {
        return html`<div>Hello World</div>`;
    },
});
const wrapper = mount(MyComponent);
const element = wrapper.find('div[data-jest="my-selector"]');

expect(element.exists()).toBeTruthy();
```

#### findAll

Finds all elements that are descendants of this wrapper that match a
[CSS selector string](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors).
Returns all elements matching the selector.

```javascript
const MyComponent = defineComponent({
    render() {
        return html`<ul>
            <li>one</li>
            <li>two</li>
            <li>three</li>
        </ul>`;
    },
});
const wrapper = mount(MyComponent);
const elements = wrapper.findAll('li');

expect(elements.length).toBe(3);
```

#### findComponent

Finds an element that is a descendant of this wrapper that is an instance of the constructor provided as the first
argument. Only returns the first element that is an instance of the constructor.

```javascript
const MyComponent = defineComponent({
    render() {
        return html`<div><my-other-component></my-other-component></div>`;
    },
});
const wrapper = mount(MyComponent);
const element = wrapper.findComponent(MyOtherComponent);

expect(element.exists()).toBeTruthy();
```

#### findComponentAll

Finds all elements that are descendants of this wrapper that are an instance of the constructor provided as the first
argument. Returns all elements that is an instance of the constructor.

```javascript
const MyComponent = defineComponent({
    render() {
        return html` <ul>
            <li><my-other-component></my-other-component></li>
            <li><my-other-component></my-other-component></li>
            <li><my-other-component></my-other-component></li>
        </ul>`;
    },
});
const wrapper = mount(MyComponent);
const elements = wrapper.findComponentAll(MyOtherComponent);

expect(elements.length).toBe(3);
```

#### html

Returns a string of the html of a wrapper.

```javascript
const template = `<div><span>foo</span><span>bar</span><span>baz</span></div>`;
const MyComponent = defineComponent({ template });

const wrapper = mount(MyComponent);

expect(wrapper.html()).toBe(template);
```

`html` returns the html _as it would be seen by a third-party script_. For instance, if you use the shadow DOM and you
close it, the shadow DOM will not be returned from `html`.

```javascript
const template = `<div>my secret DOM</div>`;
const MyComponent = defineComponent({ template, shadowMode: 'closed' });

const wrapper = mount(MyComponent);

expect(wrapper.html()).toBe(`<my-component></my-component>`);
```

If, instead, you have an open shadow DOM, it will be included in the returned `html`.

```javascript
const template = `<div>my open DOM</div>`;
const MyComponent = defineComponent({ template, shadowMode: 'open' });

const wrapper = mount(MyComponent);

expect(wrapper.html()).toBe(`<my-component>${template}</my-component>`);
```

#### length

Returns the number of DOM elements that are wrapped by this wrapper.

```javascript
const wrapper = mount(MyComponent);

expect(wrapper.length).toBe(1);
```

#### text

Returns the innerText of an html element.

```javascript
const template = `<div><span>foo</span><span>bar</span><span>baz</span></div>`;
const MyComponent = defineComponent({ template });

const wrapper = mount(MyComponent);

expect(wrapper.text()).toBe(`foo bar baz`);
```

#### trigger

Fires a custom event from the wrapped element.

```javascript
const eventName = 'click';
const payload = { foo: 'bar' };

const wrapper = mount(MyComponent);
wrapper.trigger(eventName, payload);
```

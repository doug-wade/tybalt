---
layout: layout.html
title: Writing tests
---

# Writing tests

Tybalt comes with a unit testing framework built on top of jest. Jest, along with jsdom, give us the ability to simulate realistic browser environments without a browser, and give us tools for making assertions.

To write a test for a new component, first add a new file with a `describe` block

```js
import { describe } from '@jest/globals';

describe('my component', () => {
    // TODO
});
```

Then add tests!

To add a test to an existing file, add a new `test` block containing one or more `expect` statements

```js
import { describe, expect, test } from '@jest/globals';

describe('my component', () => {
    test('true is not false', () => {
        expect(true).not.toBe(false);
    });
});
```

To render a Tybalt component into a real dom node, use `mount`

```js
import { describe, expect, test } from '@jest/globals';
import { mount } from '@tybalt/test-utils';
import { MyComponent } from '../src/my-component';

describe('my component', () => {
    test('my component has aria-label', () => {
        const mockAriaLabel = 'mock aria-label value';

        const wrapper = await mount(MyComponent, {
            attributes,
        });

        expect(wrapper.getAttribute('aria-label')).toBeTruthy();
    });
});
```

In this example, we can start to see that the wrapper that is returned from mount is a dom node, so we can use the dom methods to access things we need to access to make assertions about our components. The wrapper is super powered, and also has some extra methods, like `emitted()` and `shadowHtml()`, which give a history of every event emitted by this component and access to a web component's shadow root, respectively.

For example, you can get access to the shadow root to make assertions about the state of the dom inside it and check the history of emitted events, even though those methods aren't usually on a web component

```js
import { describe, expect, test } from '@jest/globals';
import { mount } from '@tybalt/test-utils';
import { MyComponent } from '../src/my-component';

describe('my component', () => {
    test('my component has aria-label', () => {
        const slot = '<h1 slot="banner"></h1>';
        const wrapper = await mount(MyComponent, {
            slot,
        });
        wrapper.click();

        expect(wrapper.shadowHtml()).toContain('<button');
        expect(wrapper.emitted()).toHaveLength(1);
    });
});
```

You can find out more about the mount function and its associated wrapper in the @tybalt/test-utils docs.

There is also a `flushPromises` method. This is used for resolving all promises that are currently in the event loop. If you need to wait for a mocked api call to resolve, for instance, call `flushPromises`.

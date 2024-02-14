---
layout: layout.html
title: Contexts
---

# Contexts

Contexts are used to share state that can change over time that is to be shared between multiple web components. The advantage of using contexts over other solutions, such as a store, is that the implementation is a standard, and should/will/is supported by other web component frameworks.

## Creating a new context

For this example, we've decided to distribute our theme via a context. We've decided to store contexts one per file, in a directory called `contexts` that is a sibling of our `components` directory.

To create our new context, we'll use the `createContext` method from [core](/pages/core#createContext), and add it to a new file called `contexts/theme.ts`

```typescript
import { createContext } from '@tybalt/core';

export default createContext('theme', { 
    brandColor: 'rebeccapurple', 
    // Put other tokens here as needed
});
```

## Using a context in a component

The `context` that is created can then be passed to the `contexts` argument on `defineComponent` from [core](/pages/core#defineComponent). So, we can create new components and update our old components to request the context when they are mounted

```typescript
import { defineComponent } from '@tybalt/core';
import theme from '../contexts/'

export default defineComponent({
    contexts: { theme },
    render({ theme }) {
        return html`
            <style>
                button {
                    background-color: ${theme.brandColor};
                }
            </style>
            <button></button>
        `;
    }
});
```

## Updating a context value

Now, we are going to add theme toggling, for instance between light and dark mode.

The context exposes a method, `update`, that allows the value to be updated.

```typescript
import { defineComponent, html } from '@tybalt/core';
import theme from '../contexts/theme';

import { dark, light } from '../tokens';

export default defineComponent({
    contexts: { theme },
    setUp({ theme }) {
        const clickHandler = () => {
            theme.update(theme.value === dark ? light : dark);
        };

        return { clickHandler };
    },
    render({ clickHandler }) {
        return html`
            <button @click="${clickHandler}">Change theme</button>
        `;
    }
});
```

## Unit testing with contexts

The `mount` method takes a context as a key on the second argument, `options`. If you would like to have a more integration-testing-style approach, you can import and provide the same context you use in production.

```typescript
import { mount } from '@tybalt/test-utils';
import theme from '../contexts/theme';

it('should render a css variable', () => {
    const wrapper = mount(MyComponent, { contexts: { theme } });
    const style = wrapper.find('style');

    expect(style.html()).toContain('var(--brand-cover)');
});
```

Alternatively, you can mock your context and assert that methods were called as expected, in more the style of a unit test.

```typescript
import { mount } from '@tybalt/test-utils';

it('should update the context', () => {
    const mockContext = {
        name: 'theme',
        update: jest.fn(),
    };

    const wrapper = mount(MyComponent, { contexts: { theme: mockContext } });
    const button = wrapper.find('button');
    button.click();

    expect(mockContext).toHaveBeenCalledOnce();
});
```

## Sharing contexts with external stylesheets

If you have a value from a context that you want to share with an external stylesheet, your best bet is to use a css variable.

First, add a `style` tag that defines your variable in your component file

```typescript
import { defineComponent } from '@tybalt/core';
import theme from '../contexts/'

export default defineComponent({
    props: { 
        variant: { 
            default: 'primary', 
            validator: oneOf(['primary', 'secondary']) 
        } 
    },
    contexts: { theme },
    render({ theme, variant }) {
        return html`
            <style>
                button {
                    --primary-color: ${theme.brandColor};
                    --secondary-color: ${theme.secondaryColor};
                }
            </style>
            <button class="btn-${variant}"></button>
        `;
    }
})
```

And then set the properties in your external stylesheet to the value of that css variable

```css
.btn-primary {
    background-color: var(--primary-color);
}

.btn-secondary {
    background-color: var(--secondary-color);
}
```

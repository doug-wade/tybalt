---
layout: layout.html
title: Slots
---

# Slots

There are `slot` and `template` elements in javascript that work well with web components.

```javascript
defineComponent({
    name: 'slot-example',
    shadowMode: 'open',
    render() {
        return html`
            <div class="my-class">
                <span>Example: </span>
                <slot name="content"></slot>
            </div>
        `;
    },
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

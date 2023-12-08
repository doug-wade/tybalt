---
layout: layout.html
title: Events
---

# Events

Events can be emitted from Tybalt components using `emit`, passed on the second argument to `setup`.

```javascript
defineComponent({
    name: 'setup-context',
    setup({}, { emit }): {
        emit('mounted');
    }
});
```

If you want to listen for an event, attach an event handler using a special attribute that starts with `@` and is the name of the event you want to listen for

```javascript
defineComponent({
    name: 'setup-context',
    setup(): {
        return {
            listener: () => console.log('hello world')
        }
    },
    render({ listener }) {
        return html`<button @click=${listener}>Click me!</button>`;
    }
});
```

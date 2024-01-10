---
layout: layout.html
title: Fetching data
---

# Fetching data

These exmaples use the `fetch` api, but the principle remains the same for other libraries, like `axios`.

## Fetching data in setup

When fetching data in `setup`, you'll want to create an reactive with an initial value, and then call its `next` method with the data once the request resolves.

```typescript
import { defineComponent, html } from '@tybalt/core';
import { reactive } from "@tybalt/reactive";

const BASE_URL = /* your url goes here */;

export default defineComponent({
    name: 'fetch-example',
    setup() {
        const data = reactive('');

        fetch(BASE_URL)
            .then(results => results.json())
            .then(json => data.value = json);

        return {
            data
        }
    },
    render({ data }) {
        return html`${JSON.stringify(data)}`;
    }
});
```

## Fetching data in response to user interaction

Here is a full example of how to fetch data in response to user input.

```typescript
import { defineComponent, html } from '@tybalt/core';
import { reactive } from "@tybalt/reactive";

const BASE_URL = /* your url goes here */;

export default defineComponent({
    name: 'fetch-example',
    setup() {
        const userInput = reactive('');
        const data = reactive(null);
        const loading = reactive(false);

        const clickHandler = async () => {
            loading.value = true;

            const results = await fetch(`${BASE_URL}?q=${userInput.value}`);
            const json = await results.json();
            data.value = json;

            loading.value = false;
        };

        const changeHandler = (evt: Event) => {
            userInput.value = evt.target?.value;
        };

        return {
            changeHandler,
            clickHandler,
            data,
            loading
        }
    },
    render({ data, changeHandler, clickHandler, loading }) {
        return html`
            <div>
                ${loading ? html`<div>loading...</div>` : ''}
                <div>
                    ${JSON.stringify(data)}
                </div>
                <label>
                    <span>Input</span>
                    <input
                        type="text"
                        value="${userInput}"
                        @change="${changeHandler}">
                    </input>
                </label>
                <button @click="${clickHandler}">Fetch</button>
            </div>
        `;
    },
});
```

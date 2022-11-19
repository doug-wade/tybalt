import { defineExample } from '@tybalt/core';
import Link from './link.component';

export default {
  component: Link,
};

export const Example = defineExample(Link, {
    attributes: {
        href: 'https://www.example.com'
    },
    controls: {
        href: {
            type: 'text'
        }
    },
    slot: 'www.example.com'
});

export const Github = defineExample(Link, {
    attributes: {
        href: 'https://www.github.com'
    },
    controls: {
        href: {
            type: 'text'
        }
    },
    slot: 'www.github.com'
});

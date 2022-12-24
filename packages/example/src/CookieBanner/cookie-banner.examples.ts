import { defineExample } from '@tybalt/core';
import CookieBanner from './cookie-banner.component';

export default {
    component: CookieBanner,
};

export const Default = defineExample(CookieBanner, {
    attributes: {
        href: 'https://www.example.com',
    },
    controls: {
        href: {
            type: 'text',
        },
    },
    slot: 'www.example.com',
});

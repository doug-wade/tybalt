const path = require('path');
module.exports = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: {
        name: '@tybalt/storybook',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
};

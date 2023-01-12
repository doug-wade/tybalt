import type { ScaffoldContext } from '../types';

export default () => {
    return `
        const tybaltPlugin = require('@tybalt/eleventy-plugin');

        module.exports = function (eleventyConfig) {
            eleventyConfig.addPassthroughCopy('./css');
            eleventyConfig.addPlugin(tybaltPlugin, {
                components: ['./components'],
            });
        
            return {
                passthroughFileCopy: true,
            };
        };    
    `;
};

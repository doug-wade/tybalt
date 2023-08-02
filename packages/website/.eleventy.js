const tybaltPlugin = require('@tybalt/eleventy-plugin');
const pluginPWA = require('eleventy-plugin-pwa-v2');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./css');
    eleventyConfig.addPassthroughCopy('./img');
    eleventyConfig.setBrowserSyncConfig({
        open: true,
    });

    eleventyConfig.addPlugin(tybaltPlugin, {
        components: ['./components'],
    });

    eleventyConfig.addPlugin(pluginPWA);

    return {
        pathPrefix: '/tybalt/',
        passthroughFileCopy: true,
    };
};

const tybaltPlugin = require('@tybalt/eleventy-plugin');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./css');
    eleventyConfig.addPassthroughCopy('./img');
    eleventyConfig.setBrowserSyncConfig({
        open: true,
    });

    eleventyConfig.addPlugin(tybaltPlugin, {
        components: ['./components'],
    });

    return {
        pathPrefix: '/tybalt/',
        passthroughFileCopy: true,
    };
};

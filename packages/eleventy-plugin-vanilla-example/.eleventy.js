const tybaltPlugin = require('@tybalt/eleventy-plugin');

module.exports = function (eleventyConfig) {
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

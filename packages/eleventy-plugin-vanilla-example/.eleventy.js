const tybaltPlugin = require('@tybalt/eleventy-plugin');

module.exports = function (eleventyConfig) {
    eleventyConfig.setBrowserSyncConfig({
        open: true,
    });
    eleventyConfig.addPlugin(tybaltPlugin);

    return {
        pathPrefix: '/tybalt/',
        passthroughFileCopy: true,
    };
};

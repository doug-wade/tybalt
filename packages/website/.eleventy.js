const tybaltPlugin = require('@tybalt/eleventy-plugin');
const pluginPWA = require('eleventy-plugin-pwa-v2');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./css');
    eleventyConfig.addPassthroughCopy('./img');
    eleventyConfig.addPassthroughCopy('manifest.json');
    eleventyConfig.setBrowserSyncConfig({
        open: true,
    });

    eleventyConfig.addPlugin(tybaltPlugin, {
        pattern: './components/**/*.component.ts',
    });

    eleventyConfig.addPlugin(pluginPWA, {
        cacheId: "tybalt-website",
        runtimeCaching: [
          {
            // we always want fresh copy of the index page
            urlPattern: /\/$/,
            handler: "NetworkFirst",
          },
          {
            // we also want fresh copies of any HTML page
            urlPattern: /\.html$/,
            handler: "NetworkFirst",
          },
          {
            // we serve stale copies of static assets while they're refreshed
            urlPattern:
              /^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
            handler: "StaleWhileRevalidate",
          },
        ],
      });

    return {
        passthroughFileCopy: true,
    };
};

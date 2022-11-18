// const gambitPlugin = require("@gambit/eleventy-plugin");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./components");
  eleventyConfig.addPassthroughCopy("./lib");
  //   eleventyConfig.addPlugin(gambitPlugin, {
  //     componentModules: ["./components/index.js"],
  //   });
  return {
    pathPrefix: "/gambit/",
  };
};

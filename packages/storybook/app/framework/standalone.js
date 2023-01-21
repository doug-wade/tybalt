const build = require('@storybook/core/standalone');
const tybaltOptions = require('./dist/server/options').default;

async function buildStandalone(options) {
  return build(options, tybaltOptions);
}

module.exports = buildStandalone;

// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

export default {
  packageJson,
  tybalt: 'tybalt',
  tybaltPresets: [require.resolve('./tybalt-preset-tybalt.js')],
};

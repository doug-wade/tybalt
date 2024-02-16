require('dotenv').config()
const child_process = require('child_process')

const getSentryRelease = () => {
    const pkg = require('../package.json');
    const shasum = child_process.execSync('git rev-parse HEAD').toString().trim();

    return `${pkg.name}@${pkg.version}+${shasum}`;
}

module.exports = function() {
    return {
        dsn: process.env.SENTRY_DSN || "development",
        url: process.env.SENTRY_URL || "development",
        release: getSentryRelease(),
        environment: process.env.SENTRY_ENVIRONMENT || "development",
    };
};
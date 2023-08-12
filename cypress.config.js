const { setupNodeEvents } = require('@tybalt/cypress');

const cypressProjectRoot = './packages/cypress';
const cypressOutDir = `${cypressProjectRoot}/out`;

module.exports = {
    downloadsFolder: `${cypressOutDir}/downloads`,
    screenshotsFolder: `${cypressOutDir}/screenshots`,
    videosFolder: `${cypressOutDir}/videos`,
    fixturesFolder: 'e2e',
    projectId: 'pgphiz',
    e2e: {
        specPattern: `${cypressProjectRoot}/e2e/**/*.cy.js`,
        supportFile: `${cypressProjectRoot}/support/commands.js`,
        setupNodeEvents,
    },
};

import { lighthouse, prepareAudit } from '@cypress-audit/lighthouse';

export const setupNodeEvents = (on) => {
    on('before:browser:launch', (_: any, launchOptions: Cypress.BeforeBrowserLaunchOptions) => {
        prepareAudit(launchOptions);
    });

    on('task', {
        lighthouse: lighthouse(),
    });
};

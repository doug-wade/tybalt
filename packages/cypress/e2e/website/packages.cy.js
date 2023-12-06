/// <reference types="cypress" />

const packages = [
    'cli',
    'core',
    'eleventy-plugin',
    'esbuild-plugin',
    'eslint-plugin',
    'parser',
    'test-utils',
    'validator'
];

packages.forEach((pkg) => {
    describe(`package: ${pkg}`, () => {
        beforeEach(() => {
            cy.visit(`http://localhost:8081/pages/${pkg}/`);
        });

        it('should mount the layout', () => {
            cy.get('tybalt-header').should('have.length', 1);
            cy.get('tybalt-sidebar').should('have.length', 1);
            cy.get('tybalt-footer').should('have.length', 1);
        });
    });
});
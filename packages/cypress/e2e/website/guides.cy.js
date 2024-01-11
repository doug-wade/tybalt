/// <reference types="cypress" />

const guides = ['custom-validator', 'new-website', 'styling-your-component', 'writing-tests'];

guides.forEach((guide) => {
    describe(`guide: ${guide}`, () => {
        beforeEach(() => {
            cy.visit(`http://localhost:8081/guides/${guide}/`);
        });

        it('should mount the layout', () => {
            cy.get('tybalt-header').should('have.length', 1);
            cy.get('tybalt-sidebar').should('have.length', 1);
            cy.get('tybalt-footer').should('have.length', 1);
        });
    });
});

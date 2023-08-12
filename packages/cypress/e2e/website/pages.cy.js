/// <reference types="cypress" />

const baseUrl = 'http://localhost:8081/pages/core/';

describe('markdown pages', () => {
    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it('should mount the layout', () => {
        cy.get('tybalt-header').should('have.length', 1);
        cy.get('tybalt-sidebar').should('have.length', 1);
        cy.get('tybalt-footer').should('have.length', 1);
    });

    it('should pass the lighthouse audit', () => {
        cy.lighthouse({
            accessibility: 90,
            'best-practices': 90,
            seo: 90,
            pwa: 90,
            performance: 90,
        });
    });
});

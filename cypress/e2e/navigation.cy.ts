/// <reference types="cypress" />

describe('Navigation Flow', () => {
  beforeEach(() => {
    // Clear cookies and localStorage before each test
    cy.clearCookies();
    cy.clearLocalStorage();

    // We need to stub fetch as Next.js server components use it
    cy.intercept('/_next/data/**', { fixture: 'empty.json' }).as('nextData');
  });

  it('should navigate to the home page', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('h1').should('exist');
  });

  it('should have a valid navigation menu', () => {
    cy.visit('/');

    // Check for navigation elements
    cy.get('nav').should('exist');

    // Validate that navigation links work
    cy.get('nav a').should('have.length.at.least', 1);

    // Check that each link has an href attribute
    cy.get('nav a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href');
    });
  });

  it('should have service or feature information on the home page', () => {
    cy.visit('/');

    // Check for common service-related terms in the page
    const serviceKeywords = [
      'service',
      'feature',
      'benefit',
      'offer',
      'platform',
      'solution',
      'api',
      'proxy',
      'magic',
    ];

    // Alternative approach using Cypress assertions
    cy.get('body').then(($body) => {
      const bodyText = $body.text().toLowerCase();

      // Find any matching keywords
      const matchingKeywords = serviceKeywords.filter((keyword) =>
        bodyText.includes(keyword.toLowerCase())
      );

      // Use cy.wrap to make Cypress-compatible assertions
      cy.wrap(matchingKeywords.length).should('be.at.least', 1);
    });
  });

  it('should have a footer with links', () => {
    cy.visit('/');

    // Footer should exist
    cy.get('footer').should('exist');

    // Footer should have links
    cy.get('footer a').should('have.length.at.least', 1);

    // Each link should have an href
    cy.get('footer a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href');
    });
  });

  it('should have a call-to-action button', () => {
    cy.visit('/');

    // Find a call-to-action button (could be various texts)
    cy.get('a.button, button, a.btn, a[role="button"]').should('exist');
  });

  it('should have at least one visible image', () => {
    cy.visit('/');

    // Check for images on the page
    cy.get('img').should('exist');

    // Make sure at least one image is visible
    cy.get('img').should('be.visible');
  });
});

export {};

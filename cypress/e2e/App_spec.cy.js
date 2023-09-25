describe('URL Shortener', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: 'urls.json'
    }).as('getUrls');
  });

  it('should show the page title, form, and shortened URLs that already exist', () => {
    cy.wait('@getUrls');
    cy.get('h1').contains('URL Shortener');
    cy.get('form').should('be.visible');
    cy.get('.url').should('have.length', 1);
    cy.get('.url').eq(0).contains('Awesome photo');
  });

});

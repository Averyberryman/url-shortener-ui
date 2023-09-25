describe('URL Shortener', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: 'urls.json'
    }).as('getUrls');
  });

  it('should display the page title, form, and existing shortened URLs', () => {
    cy.wait('@getUrls');
    cy.get('h1').contains('URL Shortener');
    cy.get('form').should('be.visible');
    cy.get('.url').should('have.length', 1);
    cy.get('.url').eq(0).contains('Awesome photo');
  });

  it('should reflect the entered information in input fields', () => {
    cy.get('input[name="title"]').type('Test Title');
    cy.get('input[name="title"]').should('have.value', 'Test Title');
    cy.get('input[name="urlToShorten"]').type('https://test-url.com');
    cy.get('input[name="urlToShorten"]').should('have.value', 'https://test-url.com');
  });

  it('should render a new shortened URL upon form submission', () => {
    const newUrl = {
      id: 2,
      long_url: "https://test-url.com",
      short_url: "http://localhost:3001/useshorturl/2",
      title: 'Test Title'
    };

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', newUrl).as('postUrl');

    cy.get('input[name="title"]').type('Test Title');
    cy.get('input[name="urlToShorten"]').type('https://test-url.com');
    cy.get('button').click();
    cy.wait('@postUrl');

    cy.get('.url').should('have.length', 2);
    cy.get('.url').eq(1).contains('Test Title');
  });
});

import '@testing-library/cypress/add-commands';
describe('About us Page', () => {
  it('About us exist and renders correctly', () => {
    cy.visit('/about');
    cy.findByText(/Current page: about us/i).should('exist');
  });
});

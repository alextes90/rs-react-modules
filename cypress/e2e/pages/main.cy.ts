import '@testing-library/cypress/add-commands';
describe('Main Page', () => {
  it('Render main page, cur page => mainm input presents, 20 cards', () => {
    cy.visit('/');
    cy.findByText(/Current page: main/i).should('exist');
    cy.get('input').should('have.value', '');
    cy.findAllByRole('presentation').should('have.length', 20);
  });
  it('Input work and search present only Morty', () => {
    cy.visit('/');
    cy.findByText(/Sanchez/i).should('exist');
    cy.get('input').type('Morty').should('have.value', 'Morty').type('{enter}');
    cy.findByText(/Sanchez/i).should('not.exist');
  });
  it('Modal opens and work', () => {
    cy.visit('/');
    cy.findByText(/Morty Smith/i).click();
    cy.findByText(/Status: Alive/i).should('exist');
    cy.get('button').click();
    cy.findByText(/Status: Alive/i).should('not.exist');
  });
  it('Should go to another page', () => {
    cy.visit('/');
    cy.findByText(/about us/i).click();
    cy.findByText(/Current page: about us/i).should('exist');
  });
});

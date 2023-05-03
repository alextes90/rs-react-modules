import '@testing-library/cypress/add-commands';
describe('From page', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });
  it('Form page exist and renders correctly', () => {
    cy.findByText(/Current page: Forms/i).should('exist');
  });
  it('When not correctly filled warnings appears', () => {
    cy.get('button').click();
    cy.findByText(/This input must be filed/i).should('exist');
  });
  it('If correctly field card should be created', () => {
    cy.findByPlaceholderText(/Your name/i).type('Alex');
    cy.findByText(/Date of Birth/i).type('1999-12-31');
    cy.get('select').select('Europe');
    cy.findByText(/Would you like to receive our mails/i).click();
    cy.findByText(/Female/i).click();
    cy.get('input[type=file]').selectFile('cypress/fixtures/avatar.jpg');
    cy.get('button').click();
    cy.findByText(/Your name: Alex/i).should('exist');
  });
});

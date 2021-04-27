describe('example test', () => {
  it('Visits the portal', () => {
    cy.visit('https://dev1-template-portal.openchannel.io');
    cy.get('a').contains('Log in').click();
    cy.get('input.remember__checkbox').should('have.attr', 'type', 'checkbox').click();
    cy.get('input.login__email-input')
      .should('have.attr', 'placeholder', 'Email')
      .and('have.attr', 'type', 'text')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
    cy.get('input.oc-password__input').type('Something').should('have.value', 'Something');
    cy.get('span.toggle_password').click();
  });
});

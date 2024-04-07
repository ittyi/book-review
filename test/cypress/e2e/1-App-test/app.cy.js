describe('初めてのシナリオ App.cy.tsx', () => {  
    it('email フォームのチェック', () => {
      cy.visit('http://localhost:3000/');

      cy.url().should('eq', 'http://localhost:3000/')

      cy.get('input').should('be.visible')
        .should('have.value', '')
        .type('Hello, World')
      
      console.log("cy.get('input'): ", cy.get('input'))
      cy.get('button').should('be.visible')
        .click()

      cy.url().should('eq', 'http://localhost:3000/')
    });
  })
/// <reference types="cypress" />

describe('Simulando Mouse Hover', () => {

    it('Deve mostrar um texto ao passar o mouse em cima do link do Instagram', () => {
        cy.login()
        cy.contains('Isso é Mouseover!').should('not.exist');
        // Usando o trigger para simular o mouseover
        cy.get('[data-cy="instagram-link"]').trigger('mouseover')
        cy.get('div.bg-black').should('have.text', 'Isso é Mouseover!').and('be.visible');
    })
})
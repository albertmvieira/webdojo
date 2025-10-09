/// <reference types="cypress" />

describe('Links abrindo nova guia/janela', () => {
    it('Deve abrir o link do Instagram em uma nova guia', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.get('[data-cy="instagram-link"]').should('have.attr', 'target', '_blank')
        .and('have.attr', 'href', 'https://www.instagram.com/qapapito')
    })

    it('Acessa link termos de uso removendo o target e abrindo na mesma guia', () => {
        cy.login()
        cy.contains('Formulários').should('be.visible').click()
        cy.contains('a', 'termos de uso').invoke('removeAttr', 'target').click()
        cy.url().should('include', '/terms')
        cy.contains('h1', 'Termos de Uso').should('be.visible')
        cy.go('back')
        cy.url().should('not.include', '/terms')
    })
})
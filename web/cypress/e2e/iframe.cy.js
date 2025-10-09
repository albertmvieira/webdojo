/// <reference types="cypress" />

describe('Iframe', () => {

    it('Deve assistir o vídeo de introdução dentro do Iframe', () => {
        cy.login()
        cy.contains('Video').should('be.visible').click()
        cy.url().should('include', '/video')

        cy.get('iframe[title="Video Player"]').should('exist')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
        .as('iframe')

        cy.get('@iframe').find('.play-button').click()
        cy.get('@iframe').find('.pause-button').should('be.visible').click()
    })
});
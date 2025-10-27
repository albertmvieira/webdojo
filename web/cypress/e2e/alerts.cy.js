/// <reference types="cypress" />

describe('Validações de Alertas Javascript', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar mensagem de alerta', () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Olá QA, eu sou um Alert Box!')
        })
        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve validar mensagem de confirmação - OK', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true; // Simula o clique em "OK"
        })

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })


    it('Deve validar mensagem de confirmação - Cancelar', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false; // Simula o clique em "Cancelar"
        })

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })

    it('Deve interagir com um prompt inserir um texto e validar mensagem', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Albert Vieira');
        })

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Olá Albert Vieira! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()

    })

})
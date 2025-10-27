/// <reference types="cypress" />

import consultancyData from '../fixtures/consultancyForm.json'

describe('Formulário de Consutoria', () => {

    before(() => {
        cy.log('Isso acontece uma vez antes de todos os testes')
    })

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
        cy.fixture('consultancyForm').as('consultancyData')
    })

    it('Deve solicitar consultoria individual', function () {
        // para acessar o fixture do cypress declarado no before each com this é necessário usar function() ao invés de arrow function =>

        const consultancyForm = this.consultancyData.personal

        cy.fillConsultancyForm(consultancyForm)
        cy.submitConsultancyForm()
        cy.verifySuccessModal()
    })

    it('Deve solicitar consultoria In Company', () => {
        // acessando fixture através do import no topo do arquivo
        const consultancyForm = consultancyData.company;

        cy.fillConsultancyForm(consultancyForm)
        cy.submitConsultancyForm()
        cy.verifySuccessModal()
    });

    it('Deve validar os campos obrigatórios', () => {
        cy.submitConsultancyForm()

        const requiredFields = [
            { label: 'Nome Completo *', message: 'Campo obrigatório' },
            { label: 'Email *', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]

        requiredFields.forEach(field => {
            cy.contains('label', field.label).parent().find('p')
                .should('be.visible')
                .should('have.text', field.message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })
    });


    afterEach(() => {
        cy.log('Finalizando os testes de consultoria')
    })

    after(() => {
        cy.log('Isso acontece uma vez depois de todos os testes')
    })
});
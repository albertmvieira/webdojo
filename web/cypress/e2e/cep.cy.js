/// <reference types="cypress" />

import addressData from '../fixtures/cep.json'

describe('Integração busca CEP', () => {

    beforeEach(() => {
        cy.login(true)
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('Deve validar a consulta de CEP interceptando e validando a resposta da API', () => {
        cy.intercept('GET', 'https://viacep.com.br/ws/*/json/').as('getCep')
        cy.get('#cep').type(addressData.cep)
        cy.contains('button', 'Buscar').click()
        cy.wait('@getCep').its('response.statusCode').should('eq', 200)
        cy.get('#street').should('have.value', addressData.street)
        cy.get('#neighborhood').should('have.value', addressData.neighborhood)
        cy.get('#city').should('have.value', addressData.city)
        cy.get('#state').should('have.value', addressData.state)
    })

    it('Deve validar a consulta de CEP com um stub', () => {
        cy.intercept('GET', 'https://viacep.com.br/ws/*/json/', {
            statusCode: 200,
            body: {
                logradouro: addressData.street,
                bairro: addressData.neighborhood,
                localidade: addressData.city,
                uf: addressData.state
            }
        }).as('getCepStub')
        cy.get('#cep').type('04904200')
        cy.contains('button', 'Buscar').click()
        cy.wait('@getCepStub').its('response.statusCode').should('eq', 200)
        cy.get('#street').should('have.value', addressData.street)
        cy.get('#neighborhood').should('have.value', addressData.neighborhood)
        cy.get('#city').should('have.value', addressData.city)
        cy.get('#state').should('have.value', addressData.state)
    })
})
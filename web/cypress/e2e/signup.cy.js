/// <reference types="cypress" />

describe('Cadastro de Usuário', () => {

    beforeEach(() => {
        cy.goToSignup()

        cy.intercept('POST', 'http://localhost:3333/api/users/register', {
            statusCode: 201,
            body: {
                message: 'Usuário cadastrado com sucesso'
            }
        }).as('userRegister')

    })

    it('Deve cadastrar um novo usuário com sucesso', () => {
        cy.get('#name').type('Joao Teste')
        cy.get('#email').type('joao.teste@example.com')
        cy.get('#password').type('123456')
        cy.contains('button', 'Criar conta').click()

        cy.wait('@userRegister').its('response.statusCode').should('eq', 201)
        cy.contains('Conta criada com sucesso').should('be.visible')
    })

})


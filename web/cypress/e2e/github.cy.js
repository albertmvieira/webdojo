/// <reference types="cypress" />

describe('Gerenciamento de Perfis no GitHub', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do GitHub', () => {
        cy.get('#name').type('Albert Vieira');
        cy.get('#username').type('albertmvieira');
        cy.get('#profile').type('QA');
        cy.get('#root button.w-full').click();

        cy.get('#name').type('Albert Teste');
        cy.get('#username').type('albertTeste');
        cy.get('#profile').type('Tech Lead');
        cy.get('#root button.w-full').click();

        cy.contains('table tbody tr', 'albertmvieira').should('be.visible').as('trProfile');
        cy.get('@trProfile').contains('td', 'Albert Vieira').should('be.visible');
        cy.get('@trProfile').contains('td', 'QA').should('be.visible');
    })

    it('Deve remover um perfil do GitHub', () => {
        const profile = {
            name: 'Albert Teste',
            username: 'albertDev',
            profile: 'Dev'
        }

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.profile);
        cy.get('#root button.w-full').click();
        cy.contains('table tbody tr', profile.username).should('be.visible').as('trProfileToDelete');
        cy.get('@trProfileToDelete').find('button[title="Remover perfil"]').click();

        cy.contains('table tbody', profile.username).should('not.exist');

    })

        it('Acessar meu perfil no GitHub', () => {
        const profile = {
            name: 'Albert Teste',
            username: 'albertDev',
            profile: 'Dev'
        }

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.profile);
        cy.get('#root button.w-full').click();
        cy.contains('table tbody tr', profile.username).should('be.visible').as('trProfile');
        cy.get('@trProfile').find('a').should('have.attr', 'href', `https://github.com/${profile.username}`)
        .and('have.attr', 'target', '_blank')
    })

})
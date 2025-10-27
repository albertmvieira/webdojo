/// <reference types="cypress" />

describe('template spec', () => {
  it('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]').should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]').should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.get('[data-cy="email-value"]').should('have.text', 'papito@webdojo.com')

    cy.getCookie('login_date').should((cookie) => {
      //formatando a data para o padrão DD/MM/AAAA pt-BR
      expect(cookie.value).to.equal(new Date().toLocaleDateString('pt-BR'))
    });

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      //gerando expressão regular para validar se o token MD5 esta no formato correto
      expect(token).to.match(/^[a-f0-9]{32}$/);
    })
  })

  it('Não deve logar com senha inválida', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'senhaerrada')
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
  })

  it('Não deve logar com email não cadastrado', () => {
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'senhaerrada')
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
  })
})
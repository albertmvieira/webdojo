/// <reference types="cypress" />

describe('Formulário de Consutoria', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.navigateToConsultancy('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Albert Einstein')
        cy.get('input[placeholder="Digite seu email"]').type('albert@webdojo.com')
        cy.get('input[placeholder="(00) 00000-0000"]').type('11 99999-1000').should('have.value', '(11) 99999-1000')

        // Seleciona o tipo de consultoria através do id
        cy.get('#consultancyType').select('In Company')
        // Seleciona o tipo de consultoria através do label
        cy.contains('label', 'Tipo de Consultoria').parent().find('select').select('Individual')

        // Seleciona a opção de Pessoa Física no radio button
        cy.contains('label', 'Pessoa Física').find('input').click().should('be.checked')
        cy.contains('label', 'Pessoa Jurídica').find('input').should('be.not.checked')

        // Preenchendo o campo de CPF
        cy.contains('label', 'CPF').parent().find('input').type('65602530070').should('have.value', '656.025.300-70')

        // Criando os canais de descoberta e clicando em cada um através do forEach
        const discoveryChannels = ['Instagram', 'LinkedIn', 'Udemy', 'YouTube', 'Indicação de Amigo']
        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel).find('input').check().should('be.checked')
        })

        // Upload do documento
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/document.pdf', {force: true})

        // Preenchendo o campo de texto
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]').type('Gostaria de uma consultoria para melhorar meus testes automatizados.')

        // Criando as tecnologias e clicando em cada uma através do forEach
        const techs = [
            'Cypress',
            'Selenium',
            'Playwright',
            'Robot Framework',
            'TestCafe',
            'Cucumber'
        ]
        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]').type(tech).type('{enter}')
            cy.contains('label', 'Tecnologias').parent().contains('span', tech).should('be.visible')
        })

        cy.contains('label', 'termos de uso').find('input').check().should('be.checked')
        cy.contains('button', 'Enviar formulário').click()
        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')


    });
    
});
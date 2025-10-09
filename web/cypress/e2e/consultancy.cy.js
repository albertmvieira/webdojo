/// <reference types="cypress" />

import consultancyData from '../fixtures/consultancyForm.json'

describe('Formulário de Consutoria', () => {

    before(() => {
        cy.log('Isso acontece uma vez antes de todos os testes')
    })

    beforeEach(() => {
        cy.login()
        cy.navigateToConsultancy('Formulários', 'Consultoria')
        cy.fixture('consultancyForm').as('consultancyData')
    })

    it('Deve solicitar consultoria individual', function () {
        // para acessar o fixture do cypress declarado no before each com this é necessário usar function() ao invés de arrow function =>

        const consultancyForm = this.consultancyData.personal

        cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone).should('have.value', '(11) 99999-1000')

        // Seleciona o tipo de consultoria através do id
        cy.get('#consultancyType').select(consultancyForm.consultancyType1)
        // Seleciona o tipo de consultoria através do label
        cy.contains('label', 'Tipo de Consultoria').parent().find('select').select(consultancyForm.consultancyType2)

        // Seleciona a opção de Pessoa Física no radio button
        if (consultancyForm.personType === 'Pessoa Física') {
            cy.contains('label', 'Pessoa Física').find('input').click().should('be.checked')
            cy.contains('label', 'Pessoa Jurídica').find('input').should('be.not.checked')
        } else {
            cy.contains('label', 'Pessoa Jurídica').find('input').click().should('be.checked')
            cy.contains('label', 'Pessoa Física').find('input').should('be.not.checked')
        }

        // Preenchendo o campo de CPF
        cy.contains('label', 'CPF').parent().find('input').type(consultancyForm.cpf).should('have.value', consultancyForm.cpf)

        // Criando os canais de descoberta e clicando em cada um através do forEach
        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel).find('input').check().should('be.checked')
        })

        // Upload do documento
        cy.get('input[type="file"]').selectFile(consultancyForm.documentPath, { force: true })

        // Preenchendo o campo de texto
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]').type(consultancyForm.description)

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]').type(tech).type('{enter}')
            cy.contains('label', 'Tecnologias').parent().contains('span', tech).should('be.visible')
        })

        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso').find('input').check().should('be.checked')
        }
        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 7000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    });

    it('Deve solicitar consultoria In Company', () => {
        // acessando fixture através do import no topo do arquivo
        const consultancyForm = consultancyData.company;

        cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone).should('have.value', '(11) 99999-1000')

        // Seleciona o tipo de consultoria através do id
        cy.get('#consultancyType').select(consultancyForm.consultancyType1)
        // Seleciona o tipo de consultoria através do label
        cy.contains('label', 'Tipo de Consultoria').parent().find('select').select(consultancyForm.consultancyType2)

        // Seleciona a opção de Pessoa Física no radio button
        if (consultancyForm.personType === 'Pessoa Física') {
            cy.contains('label', 'Pessoa Física').find('input').click().should('be.checked')
            cy.contains('label', 'Pessoa Jurídica').find('input').should('be.not.checked')
        } else {
            cy.contains('label', 'Pessoa Jurídica').find('input').click().should('be.checked')
            cy.contains('label', 'Pessoa Física').find('input').should('be.not.checked')
        }

        // Preenchendo o campo de Documento
        cy.contains('label', 'CNPJ').parent().find('input').type(consultancyForm.document).should('have.value', consultancyForm.document)

        // Criando os canais de descoberta e clicando em cada um através do forEach
        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel).find('input').check().should('be.checked')
        })

        // Upload do documento
        cy.get('input[type="file"]').selectFile(consultancyForm.documentPath, { force: true })

        // Preenchendo o campo de texto
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]').type(consultancyForm.description)

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]').type(tech).type('{enter}')
            cy.contains('label', 'Tecnologias').parent().contains('span', tech).should('be.visible')
        })

        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso').find('input').check().should('be.checked')
        }
        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', { timeout: 7000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    });

    it('Deve validar os campos obrigatórios', () => {
        cy.contains('button', 'Enviar formulário').click()

        cy.contains('label', 'Nome Completo *').parent().find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email *').parent().find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso').parent().find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
    });


    afterEach(() => {
        cy.log('Finalizando os testes de consultoria')
    })

    after(() => {
        cy.log('Isso acontece uma vez depois de todos os testes')
    })
});
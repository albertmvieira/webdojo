/// <reference types="cypress" />

Cypress.Commands.add('fillConsultancyForm', (consultancyForm) => {
    cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)
    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
    cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone).should('have.value', '(11) 99999-1000')

    // Seleciona o tipo de consultoria através do id
    cy.get('#consultancyType').select(consultancyForm.consultancyType1)
    // Seleciona o tipo de consultoria através do label
    cy.contains('label', 'Tipo de Consultoria').parent().find('select').select(consultancyForm.consultancyType2)

    // Seleciona a opção no radio button
    if (consultancyForm.personType === 'Pessoa Física') {
        cy.contains('label', 'Pessoa Física').find('input').click().should('be.checked')
        cy.contains('label', 'Pessoa Jurídica').find('input').should('be.not.checked')
        cy.contains('label', 'CPF').parent().find('input').type(consultancyForm.document).should('have.value', consultancyForm.document)
    } else {
        cy.contains('label', 'Pessoa Jurídica').find('input').click().should('be.checked')
        cy.contains('label', 'Pessoa Física').find('input').should('be.not.checked')
        cy.contains('label', 'CNPJ').parent().find('input').type(consultancyForm.document).should('have.value', consultancyForm.document)
    }

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
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário').click()

})

Cypress.Commands.add('verifySuccessModal', () => {
    cy.get('.modal', { timeout: 7000 }).should('be.visible')
        .find('.modal-content').should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})
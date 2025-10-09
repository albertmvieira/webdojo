/// <reference types="cypress" />

describe('Kanban Board', () => {
    it('Deve permitir mover uma tarefa de "A Fazer" para "Em Progresso"', () => {
        cy.login()
        cy.contains('Kanban').should('be.visible').click()
        cy.url().should('include', '/kanban')

        // Simulando o drag and drop
        //Identifica elemento que será arrastado e faz o dragstart
        const dataTransfer = new DataTransfer();
        cy.contains('div[draggable="true"]', 'Documentar API').should('be.visible')
        .trigger('dragstart', { dataTransfer })

        //Identifica a coluna de destino e faz o drop
        cy.get('.column-done').should('be.visible')
        .trigger('drop', { dataTransfer })
        .find('h3')
        .should('have.text', 'Done (4)')
        
        cy.get('.column-done').should('include.text', 'Documentar API')

    })
});
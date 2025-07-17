describe('Agenda de Contatos', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/')
    cy.wait(3000)
  })

  it('deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type('João Silva')
    cy.get('input[placeholder="E-mail"]').type('joao@teste.com')
    cy.get('input[placeholder="Telefone"]').type('11999999999')
    cy.get('button[type="submit"]').click()

    cy.contains('João Silva', { timeout: 10000 }).should('be.visible')
    cy.contains('joao@teste.com').should('be.visible')
    cy.contains('11999999999').should('be.visible')
  })

  it('deve editar um contato existente', () => {
    cy.get('input[placeholder="Nome"]').type('Maria Santos')
    cy.get('input[placeholder="E-mail"]').type('maria@teste.com')
    cy.get('input[placeholder="Telefone"]').type('11888888888')
    cy.get('button[type="submit"]').click()

    cy.contains('Maria Santos', { timeout: 10000 }).should('be.visible')

    cy.get('.edit').last().click()
    cy.wait(2000)

    cy.get('input[placeholder="Nome"]').clear().type('Maria Silva Santos')
    cy.get('input[placeholder="E-mail"]').clear().type('maria.silva@teste.com')
    cy.get('input[placeholder="Telefone"]').clear().type('11777777777')
    cy.get('button[type="submit"]').click()

    cy.contains('Maria Silva Santos', { timeout: 10000 }).should('be.visible')
  })

  it('deve remover um contato', () => {
    cy.get('input[placeholder="Nome"]').type('Pedro Oliveira')
    cy.get('input[placeholder="E-mail"]').type('pedro@teste.com')
    cy.get('input[placeholder="Telefone"]').type('11666666666')
    cy.get('button[type="submit"]').click()

    cy.contains('Pedro Oliveira', { timeout: 10000 }).should('be.visible')

    cy.get('.delete').last().click()

    // Aguardar mais tempo para a remoção
    cy.contains('Pedro Oliveira', { timeout: 15000 }).should('not.exist')
  })
})
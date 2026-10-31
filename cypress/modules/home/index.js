const seletores = {
  carrossel: '#slider',
  logo: '.logo img'
}

export function acessar() {
  cy.visit('/')
}

export function verificarPaginaVisivel() {
  cy.title().should('eq', 'Automation Exercise')
  cy.get(seletores.logo).should('be.visible')
  cy.get(seletores.carrossel).should('be.visible')
}

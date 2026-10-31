const seletores = {
  rodape: 'footer',
  tituloInscricao: 'footer .single-widget h2',
  email: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  mensagemSucesso: '#success-subscribe .alert-success'
}

export function rolarAteRodape() {
  cy.get(seletores.rodape).scrollIntoView()
  cy.get(seletores.tituloInscricao).should('be.visible').and('have.text', 'Subscription')
}

export function inscrever(email) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.botaoInscrever).click()
}

export function verificarInscricaoRealizada() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('have.text', 'You have been successfully subscribed!')
}

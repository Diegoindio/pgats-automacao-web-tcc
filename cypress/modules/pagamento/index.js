const seletores = {
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  pedidoConfirmado: '[data-qa="order-placed"]'
}

export function pagar(cartao) {
  cy.get(seletores.nomeCartao).type(cartao.nome)
  cy.get(seletores.numeroCartao).type(cartao.numero, { log: false })
  cy.get(seletores.cvc).type(cartao.cvc, { log: false })
  cy.get(seletores.mesExpiracao).type(cartao.mesExpiracao)
  cy.get(seletores.anoExpiracao).type(cartao.anoExpiracao)
  cy.get(seletores.botaoPagar).click()
}

// A mensagem "Your order has been placed successfully!" aparece só por um instante antes do
// redirecionamento; a confirmação estável do pedido é a página /payment_done.
export function verificarPedidoConfirmado() {
  cy.location('pathname').should('include', '/payment_done')
  cy.get(seletores.pedidoConfirmado).should('be.visible').and('contain', 'Order Placed!')
  cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
}

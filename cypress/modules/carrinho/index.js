const seletores = {
  breadcrumbAtivo: '.breadcrumbs .active',
  tabelaItens: '#cart_info_table',
  finalizarCompra: '.check_out'
}

export function verificarPaginaVisivel(produtos) {
  cy.location('pathname').should('eq', '/view_cart')
  cy.get(seletores.breadcrumbAtivo).should('contain', 'Shopping Cart')
  cy.get(seletores.tabelaItens).should('be.visible')

  produtos.forEach((produto) => {
    cy.get(seletores.tabelaItens).should('contain', produto.nome)
  })
}

export function prosseguirParaCheckout() {
  cy.contains(seletores.finalizarCompra, 'Proceed To Checkout').click()
}

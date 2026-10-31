const seletores = {
  tituloLista: '.features_items h2.title',
  cartaoProduto: '.features_items .product-image-wrapper',
  nomeProduto: '.features_items .productinfo p',
  verProduto: '.features_items .choose a[href^="/product_details/"]',
  campoBusca: '#search_product',
  botaoBuscar: '#submit_search',
  detalhes: '.product-information',
  preco: '.product-information span span',
  modalCarrinho: '#cartModal',
  continuarComprando: '#cartModal .close-modal'
}

export function verificarPaginaTodosProdutos() {
  cy.location('pathname').should('eq', '/products')
  cy.get(seletores.tituloLista).should('be.visible').and('have.text', 'All Products')
  cy.get(seletores.cartaoProduto).should('have.length.greaterThan', 0)
}

export function abrirPrimeiroProduto() {
  cy.get(seletores.verProduto).first().click()
}

export function verificarDetalhesProduto() {
  cy.location('pathname').should('match', /^\/product_details\/\d+$/)
  cy.get(seletores.detalhes).within(() => {
    cy.get('h2').should('be.visible').and('not.be.empty')
    cy.contains('p', 'Category:').should('be.visible')
    cy.contains('p', 'Availability:').should('be.visible')
    cy.contains('p', 'Condition:').should('be.visible')
    cy.contains('p', 'Brand:').should('be.visible')
  })
  cy.get(seletores.preco).should('be.visible').and('contain', 'Rs.')
}

export function buscar(termo) {
  cy.get(seletores.campoBusca).type(termo)
  cy.get(seletores.botaoBuscar).click()
}

export function verificarResultadoBusca(termo) {
  cy.get(seletores.tituloLista).should('be.visible').and('have.text', 'Searched Products')
  cy.get(seletores.nomeProduto)
    .should('have.length.greaterThan', 0)
    .each(($nome) => {
      expect($nome.text()).to.match(new RegExp(termo, 'i'))
    })
}

export function adicionarAoCarrinho(idProduto) {
  cy.get(`.productinfo [data-product-id="${idProduto}"]`).click()
  cy.get(seletores.modalCarrinho).should('be.visible').and('contain', 'Your product has been added to cart.')
  cy.get(seletores.continuarComprando).click()
  cy.get(seletores.modalCarrinho).should('not.be.visible')
}

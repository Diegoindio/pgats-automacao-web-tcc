const seletores = {
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  resumoPedido: '.cart_info',
  comentario: 'textarea[name="message"]',
  fazerPedido: 'a[href="/payment"]'
}

export function verificarDetalhesEndereco(usuario) {
  cy.contains('h2', 'Address Details').should('be.visible')

  const dadosEsperados = [
    usuario.primeiroNome,
    usuario.sobrenome,
    usuario.endereco,
    usuario.cidade,
    usuario.pais,
    usuario.celular
  ]

  dadosEsperados.forEach((dado) => {
    cy.get(seletores.enderecoEntrega).should('contain', dado)
    cy.get(seletores.enderecoCobranca).should('contain', dado)
  })
}

export function verificarResumoPedido(produtos) {
  cy.contains('h2', 'Review Your Order').should('be.visible')

  produtos.forEach((produto) => {
    cy.get(seletores.resumoPedido).should('contain', produto.nome)
  })
}

export function fazerPedido(comentario) {
  cy.get(seletores.comentario).type(comentario)
  cy.get(seletores.fazerPedido).click()
}

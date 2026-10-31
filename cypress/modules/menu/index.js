const seletores = {
  menu: '.shop-menu',
  login: '.shop-menu a[href="/login"]',
  produtos: '.shop-menu a[href="/products"]',
  carrinho: '.shop-menu a[href="/view_cart"]',
  sair: '.shop-menu a[href="/logout"]',
  excluirConta: '.shop-menu a[href="/delete_account"]'
}

export function irParaLogin() {
  cy.get(seletores.login).click()
}

export function irParaProdutos() {
  cy.get(seletores.produtos).click()
}

export function irParaCarrinho() {
  cy.get(seletores.carrinho).click()
}

export function sair() {
  cy.get(seletores.sair).click()
}

export function excluirConta() {
  cy.get(seletores.excluirConta).click()
}

export function verificarUsuarioLogado(nome) {
  cy.contains(`${seletores.menu} a`, 'Logged in as')
    .should('be.visible')
    .and('contain', nome)
}

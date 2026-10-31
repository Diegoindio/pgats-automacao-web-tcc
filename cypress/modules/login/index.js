const seletores = {
  formulario: '.login-form',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemErro: '.login-form p'
}

export function verificarFormularioVisivel() {
  cy.contains(`${seletores.formulario} h2`, 'Login to your account').should('be.visible')
}

export function entrar(email, senha) {
  cy.get(seletores.email).type(email)
  cy.get(seletores.senha).type(senha, { log: false })
  cy.get(seletores.botaoEntrar).click()
}

export function verificarErroCredenciaisInvalidas() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('have.text', 'Your email or password is incorrect!')
}

export function verificarPaginaLogin() {
  cy.location('pathname').should('eq', '/login')
  verificarFormularioVisivel()
}

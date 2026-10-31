const seletores = {
  formularioNovoUsuario: '.signup-form',
  nomeNovoUsuario: '[data-qa="signup-name"]',
  emailNovoUsuario: '[data-qa="signup-email"]',
  botaoCadastrar: '[data-qa="signup-button"]',
  mensagemErro: '.signup-form p',

  tituloSr: '#id_gender1',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  contaCriada: '[data-qa="account-created"]',
  contaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]'
}

export function verificarFormularioNovoUsuarioVisivel() {
  cy.contains(`${seletores.formularioNovoUsuario} h2`, 'New User Signup!').should('be.visible')
}

export function iniciarCadastro(nome, email) {
  cy.get(seletores.nomeNovoUsuario).type(nome)
  cy.get(seletores.emailNovoUsuario).type(email)
  cy.get(seletores.botaoCadastrar).click()
}

export function verificarErroEmailExistente() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('have.text', 'Email Address already exist!')
}

export function preencherInformacoesDaConta(usuario) {
  cy.contains('h2', 'Enter Account Information').should('be.visible')

  cy.get(seletores.tituloSr).check()
  cy.get(seletores.senha).type(usuario.senha, { log: false })
  cy.get(seletores.diaNascimento).select(usuario.nascimento.dia)
  cy.get(seletores.mesNascimento).select(usuario.nascimento.mes)
  cy.get(seletores.anoNascimento).select(usuario.nascimento.ano)
  cy.get(seletores.newsletter).check()
  cy.get(seletores.ofertas).check()
}

export function preencherEndereco(usuario) {
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome)
  cy.get(seletores.sobrenome).type(usuario.sobrenome)
  cy.get(seletores.empresa).type(usuario.empresa)
  cy.get(seletores.endereco).type(usuario.endereco)
  cy.get(seletores.complemento).type(usuario.complemento)
  cy.get(seletores.pais).select(usuario.pais)
  cy.get(seletores.estado).type(usuario.estado)
  cy.get(seletores.cidade).type(usuario.cidade)
  cy.get(seletores.cep).type(usuario.cep)
  cy.get(seletores.celular).type(usuario.celular)
}

export function criarConta() {
  cy.get(seletores.botaoCriarConta).click()
}

export function verificarContaCriada() {
  cy.get(seletores.contaCriada).should('be.visible').and('contain', 'Account Created!')
}

export function verificarContaExcluida() {
  cy.get(seletores.contaExcluida).should('be.visible').and('contain', 'Account Deleted!')
}

export function continuar() {
  cy.get(seletores.botaoContinuar).click()
}

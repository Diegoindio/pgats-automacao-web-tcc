// Comandos de preparação de massa via API (https://automationexercise.com/api_list)
// A API responde HTTP 200 com o status real no corpo (texto JSON), por isso validamos o "responseCode".

Cypress.Commands.add('criarUsuarioViaApi', (usuario) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: usuario.titulo,
      birth_date: usuario.nascimento.dia,
      birth_month: usuario.nascimento.mes,
      birth_year: usuario.nascimento.ano,
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.complemento,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular
    }
  })
    .its('body')
    .then(JSON.parse)
    .its('responseCode')
    .should('eq', 201)
})

Cypress.Commands.add('excluirUsuarioViaApi', (usuario) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: {
      email: usuario.email,
      password: usuario.senha
    }
  })
})

import * as home from '../modules/home'
import * as menu from '../modules/menu'
import * as cadastro from '../modules/cadastro'
import { gerarUsuario } from '../dados/usuario'

describe('Cadastro de usuário', () => {
  let usuario

  beforeEach(() => {
    usuario = gerarUsuario()

    home.acessar()
    home.verificarPaginaVisivel()
    menu.irParaLogin()
    cadastro.verificarFormularioNovoUsuarioVisivel()
  })

  afterEach(() => {
    cy.excluirUsuarioViaApi(usuario)
  })

  it('Test Case 1: Register User', () => {
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.preencherInformacoesDaConta(usuario)
    cadastro.preencherEndereco(usuario)
    cadastro.criarConta()

    cadastro.verificarContaCriada()
    cadastro.continuar()
    menu.verificarUsuarioLogado(usuario.nome)

    menu.excluirConta()
    cadastro.verificarContaExcluida()
    cadastro.continuar()
  })

  it('Test Case 5: Register User with existing email', () => {
    cy.criarUsuarioViaApi(usuario)

    cadastro.iniciarCadastro(usuario.nome, usuario.email)

    cadastro.verificarErroEmailExistente()
  })
})

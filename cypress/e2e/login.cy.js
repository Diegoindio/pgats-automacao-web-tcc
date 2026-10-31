import * as home from '../modules/home'
import * as menu from '../modules/menu'
import * as login from '../modules/login'
import * as cadastro from '../modules/cadastro'
import { gerarUsuario } from '../dados/usuario'

describe('Login de usuário', () => {
  let usuario

  beforeEach(() => {
    usuario = gerarUsuario()

    home.acessar()
    home.verificarPaginaVisivel()
    menu.irParaLogin()
    login.verificarFormularioVisivel()
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    login.entrar(usuario.email, usuario.senha)

    login.verificarErroCredenciaisInvalidas()
  })

  context('com usuário já cadastrado', () => {
    beforeEach(() => {
      cy.criarUsuarioViaApi(usuario)
    })

    afterEach(() => {
      cy.excluirUsuarioViaApi(usuario)
    })

    it('Test Case 2: Login User with correct email and password', () => {
      login.entrar(usuario.email, usuario.senha)
      menu.verificarUsuarioLogado(usuario.nome)

      menu.excluirConta()
      cadastro.verificarContaExcluida()
    })

    it('Test Case 4: Logout User', () => {
      login.entrar(usuario.email, usuario.senha)
      menu.verificarUsuarioLogado(usuario.nome)

      menu.sair()

      login.verificarPaginaLogin()
    })
  })
})

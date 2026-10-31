import * as home from '../modules/home'
import * as menu from '../modules/menu'
import * as login from '../modules/login'
import * as cadastro from '../modules/cadastro'
import * as produtos from '../modules/produtos'
import * as carrinho from '../modules/carrinho'
import * as checkout from '../modules/checkout'
import * as pagamento from '../modules/pagamento'
import { gerarUsuario } from '../dados/usuario'
import { gerarCartao } from '../dados/pagamento'
import { produtosDoPedido } from '../dados/produtos'

describe('Realizar pedido', () => {
  let usuario

  beforeEach(() => {
    usuario = gerarUsuario()

    home.acessar()
    home.verificarPaginaVisivel()
    menu.irParaLogin()
  })

  afterEach(() => {
    cy.excluirUsuarioViaApi(usuario)
  })

  function finalizarPedidoEExcluirConta() {
    produtosDoPedido.forEach((produto) => produtos.adicionarAoCarrinho(produto.id))
    menu.irParaCarrinho()
    carrinho.verificarPaginaVisivel(produtosDoPedido)
    carrinho.prosseguirParaCheckout()

    checkout.verificarDetalhesEndereco(usuario)
    checkout.verificarResumoPedido(produtosDoPedido)
    checkout.fazerPedido('Pedido de teste automatizado - entregar em horário comercial.')

    pagamento.pagar(gerarCartao(usuario.nome))
    pagamento.verificarPedidoConfirmado()

    menu.excluirConta()
    cadastro.verificarContaExcluida()
    cadastro.continuar()
  }

  it('Test Case 15: Place Order: Register before Checkout', () => {
    cadastro.iniciarCadastro(usuario.nome, usuario.email)
    cadastro.preencherInformacoesDaConta(usuario)
    cadastro.preencherEndereco(usuario)
    cadastro.criarConta()
    cadastro.verificarContaCriada()
    cadastro.continuar()
    menu.verificarUsuarioLogado(usuario.nome)

    finalizarPedidoEExcluirConta()
  })

  it('Test Case 16: Place Order: Login before Checkout', () => {
    cy.criarUsuarioViaApi(usuario)

    login.entrar(usuario.email, usuario.senha)
    menu.verificarUsuarioLogado(usuario.nome)

    finalizarPedidoEExcluirConta()
  })
})

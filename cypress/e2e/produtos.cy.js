import * as home from '../modules/home'
import * as menu from '../modules/menu'
import * as produtos from '../modules/produtos'

describe('Produtos', () => {
  beforeEach(() => {
    home.acessar()
    home.verificarPaginaVisivel()
    menu.irParaProdutos()
    produtos.verificarPaginaTodosProdutos()
  })

  it('Test Case 8: Verify All Products and product detail page', () => {
    produtos.abrirPrimeiroProduto()

    produtos.verificarDetalhesProduto()
  })

  it('Test Case 9: Search Product', () => {
    const termo = 'Top'

    produtos.buscar(termo)

    produtos.verificarResultadoBusca(termo)
  })
})

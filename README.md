# PGATS - Automação Web com Cypress (Trabalho de Conclusão)

Automação dos casos de teste da aplicação [Automation Exercise](https://automationexercise.com/test_cases) com **Cypress**, relatórios com **cypress-mochawesome-reporter** e execução via **GitHub Actions**.

## Casos de teste implementados

| Caso | Descrição | Spec |
|------|-----------|------|
| 1  | Register User | `cypress/e2e/cadastro.cy.js` |
| 2  | Login User with correct email and password | `cypress/e2e/login.cy.js` |
| 3  | Login User with incorrect email and password | `cypress/e2e/login.cy.js` |
| 4  | Logout User | `cypress/e2e/login.cy.js` |
| 5  | Register User with existing email | `cypress/e2e/cadastro.cy.js` |
| 8  | Verify All Products and product detail page | `cypress/e2e/produtos.cy.js` |
| 9  | Search Product | `cypress/e2e/produtos.cy.js` |
| 10 | Verify Subscription in home page | `cypress/e2e/inscricao.cy.js` |
| 15 | Place Order: Register before Checkout | `cypress/e2e/pedido.cy.js` |
| 16 | Place Order: Login before Checkout | `cypress/e2e/pedido.cy.js` |

## Estrutura

```
cypress/
  e2e/            # specs: apenas os passos do teste, sem seletores
  modules/        # módulos por funcionalidade: seletores, ações e asserções
    home/ menu/ login/ cadastro/ produtos/ carrinho/ checkout/ pagamento/ rodape/
  dados/          # geração de massa de dados (Faker) e dados fixos dos produtos
  support/
    commands.js   # comandos customizados de preparação via API
    e2e.js
.github/workflows/cypress.yml
```

## Padrões adotados

- **Modularização**: cada funcionalidade tem seu módulo em `cypress/modules/<funcionalidade>`, com uma constante `seletores` e funções que agrupam as interações e as asserções.
- **Seletores**: prioridade para atributos dedicados a teste (`data-qa`), depois `id` e atributos estáveis (`href`, `name`). Sem XPath e sem dependência de classes de layout.
- **Massa de dados**: usuários gerados com Faker a cada execução (e-mails únicos), sem dependência entre testes.
- **Preparação e limpeza via API**: quando o teste precisa de um usuário já cadastrado (casos 2, 4, 5 e 16), ele é criado pela API da aplicação (`cy.criarUsuarioViaApi`). O `afterEach` remove o usuário pela API (`cy.excluirUsuarioViaApi`), garantindo limpeza mesmo se o teste falhar no meio.
- **Estabilidade**: domínios de anúncios bloqueados (`blockHosts`) e retentativas apenas em modo headless/CI (`retries.runMode: 2`).

> **Caso 15/16 – mensagem de sucesso:** a mensagem "Your order has been placed successfully!" aparece só por um instante antes do redirecionamento. O teste valida a página de confirmação (`/payment_done`, "Order Placed!" e "Congratulations! Your order has been confirmed!").

## Como executar

Pré-requisito: Node.js 22+.

```bash
npm install
npm test          # executa todos os testes em modo headless e gera o relatório
npm run cy:open   # abre o Cypress em modo interativo
```

## Relatório

Após a execução, o relatório HTML fica em `cypress/reports/index.html`, com screenshots das falhas embutidas.

No GitHub Actions, o relatório é publicado como artefato **relatorio-cypress** ao final de cada execução (inclusive quando há falhas): aba **Actions** → execução → seção **Artifacts**.

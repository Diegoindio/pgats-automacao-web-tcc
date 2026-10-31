import 'cypress-mochawesome-reporter/register'
import './commands'

// Scripts de terceiros da aplicação (anúncios bloqueados) podem lançar erros que não são do fluxo testado
Cypress.on('uncaught:exception', () => false)

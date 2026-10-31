import { faker } from '@faker-js/faker'

export function gerarCartao(nomeTitular) {
  return {
    nome: nomeTitular,
    numero: faker.string.numeric(16),
    cvc: faker.finance.creditCardCVV(),
    mesExpiracao: '12',
    anoExpiracao: String(new Date().getFullYear() + 3)
  }
}

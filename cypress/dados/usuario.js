import { faker } from '@faker-js/faker'

export function gerarUsuario() {
  const primeiroNome = faker.person.firstName()
  const sobrenome = faker.person.lastName()

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: faker.internet.exampleEmail({ firstName: primeiroNome, lastName: `${sobrenome}${Date.now()}` }).toLowerCase(),
    senha: faker.internet.password({ length: 10 }),
    titulo: 'Mr',
    nascimento: { dia: '15', mes: '6', ano: '1990' },
    primeiroNome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    complemento: faker.location.secondaryAddress(),
    pais: 'Canada',
    estado: faker.location.state(),
    cidade: faker.location.city(),
    cep: faker.location.zipCode('#####'),
    celular: faker.string.numeric(11)
  }
}

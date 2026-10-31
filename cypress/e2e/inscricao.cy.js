import { faker } from '@faker-js/faker'
import * as home from '../modules/home'
import * as rodape from '../modules/rodape'

describe('Inscrição na newsletter', () => {
  it('Test Case 10: Verify Subscription in home page', () => {
    home.acessar()
    home.verificarPaginaVisivel()

    rodape.rolarAteRodape()
    rodape.inscrever(faker.internet.exampleEmail())

    rodape.verificarInscricaoRealizada()
  })
})

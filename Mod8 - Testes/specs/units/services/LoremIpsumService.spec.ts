import { LoremIpsumService } from '../../../src/services/LoremIpsumService'

describe('LoremIpsumService', () => {
  let _service: LoremIpsumService

  it ('deveria instanciar corretamente a classe', () => {
    _service = new LoremIpsumService()
    expect(_service).toBeTruthy()
  })

  it('Se um número pequeno (4) for passado, o mesmo número (4) é esperado.', () => {
    const resultado = _service.getLoremIpsum(4)

    const resultadoEsperado = resultado.split(" ").length
    expect(resultadoEsperado).toBe(4)
  })

  it('Se um número grande (100) for passado, o mesmo número (100) é esperado.', () => {
    const resultado = _service.getLoremIpsum(100)

    const resultadoEsperado = resultado.split(" ").length
    expect(resultadoEsperado).toBe(100)
  })




  
})
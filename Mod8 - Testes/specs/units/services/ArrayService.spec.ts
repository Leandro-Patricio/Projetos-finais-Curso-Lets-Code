import { ArrayService } from '../../../src/services/ArrayService'

describe('ArrayService', () => {
  let _service: ArrayService

  it ('deveria instanciar corretamente a classe', () => {
    _service = new ArrayService()
    expect(_service).toBeTruthy()
  })

  it('Resultado: descrescente e sem palavras repetidas', () => {
    const resultado = _service.getReordenaAll(
      ["alfa","beta","gama","beta","gama"],
      false,
      true
  )
    expect(resultado).toStrictEqual(
      //["alfa", "beta","gama"]
      ["gama","beta","alfa"]
    )
  })

  it('Resultado: crescente e sem palavras repetidas', () => {
    const resultado = _service.getReordenaAll(
      ["alfa","beta","gama","beta","gama"],
      true,
      true
  )
    expect(resultado).toStrictEqual(
      ["alfa","beta","gama"]
    )
  })

  it('Resultado: crescente e com palavras repetidas', () => {
    const resultado = _service.getReordenaAll(
      ["alfa","beta","gama","beta","gama"],
      true,
      false
  )
    expect(resultado).toStrictEqual(
      ["alfa", "beta", "beta","gama","gama"]
    )
  })

  it('Resultado: decrescente e com palavras repetidas', () => {
    const resultado = _service.getReordenaAll(
      ["alfa","beta","gama","beta","gama"],
      false,
      false
  )
    expect(resultado).toStrictEqual(
      ["gama","gama","beta","beta","alfa"],
    )
  })

  it('Resultado: decrescente e com palavras repetidas', () => {
    const resultado = _service.getReordenaAll(
      [1,2,3,1,2],
      false,
      false
  )
    expect(resultado).toStrictEqual(
      [3,2,2,1,1]
    )
  })

})
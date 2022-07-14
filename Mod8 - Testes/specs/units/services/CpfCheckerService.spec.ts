import { CpfCheckerService } from '../../../src/services/CpfCheckerService'

describe('CpfCheckerService', () => {
  let _service: CpfCheckerService

  it ('deveria instanciar corretamente a classe', () => {
    _service = new CpfCheckerService()
    expect(_service).toBeTruthy()
  })

  it('Se um número com compriemnto menor do que 11, deve falhar', () => {
    expect(()=>{_service.getCpfChecker(123123)}).toThrow('O CPF deve ter 11 números. Adicione algarismos')
  })

  it('Se um número com compriemnto maior do que 11, deve falhar', () => {
    expect(()=>{_service.getCpfChecker(1231231231231231231233)}).toThrow('O CPF deve ter 11 números. Retire algarismos')
  })

  it('Se um número negativo for passador, deve falhar', () => {
    expect(()=>{_service.getCpfChecker(-123123)}).toThrow('O CPF não pode ser um número negativo')
  })

  it('Se for passado um NaN, deve falhar.', () => {
    expect(()=>{_service.getCpfChecker(Number.NaN)}).toThrow('Apenas números são permitidos')
  })

  it('Se passar um Cpf com o primeiro dígito de verificação errado, deve falhar', ()=>{
    const resultado = _service.getCpfChecker(55579650266)

    expect(resultado).toBe("Seu Cpf NÃO é válido. Primeiro dígito de verficação não confere")
  })

  it('Se passar um Cpf com o segundo dígito de verificação errado, deve falhar', ()=>{
    const resultado = _service.getCpfChecker(72631609601)
    expect(resultado).toBe("Seu Cpf NÃO é válido. Segundo dígito de verficação não confere")
     })

  it('Se passar um Cpf válido, deve ser um sucesso', ()=>{
    expect(()=>_service.getCpfChecker(55579650256)).not.toThrow()
  })
 
  //resultado feliz
  it.each([
  {Cpf:53051914673},
  {Cpf:26078227262},
  {Cpf:43127538065},
  {Cpf:51714935027},
  {Cpf:55579650256},
  {Cpf:86682114710},
  {Cpf:82822253803},
  {Cpf:34903014800},
  
  {Cpf:97776502308},
  ])(`$Cpf = $resultado`, ({Cpf})=>{
    expect(()=>_service.getCpfChecker(Cpf)).not.toThrow()
  })

  
})
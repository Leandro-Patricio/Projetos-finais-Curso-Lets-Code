// logica retirada de: https://www.calculadorafacil.com.br/computacao/validar-cpf

export class CpfCheckerService {
  constructor() {}


  
  getCpfChecker=(Cpf: number)=>{

    
/*     if(!Number.isInteger(Cpf)){
      throw Error('Apenas números são permitidos')
    } */
    if(Number.isNaN(Cpf)){
      throw Error('Apenas números são permitidos')
    }
    if(Cpf < 0){
      throw Error('O CPF não pode ser um número negativo')
    }

     
    const CpfArray = Array.from(String(Cpf),Number)

    if (CpfArray.length<11){
      throw Error('O CPF deve ter 11 números. Adicione algarismos')
    }
    if(CpfArray.length>11){
      throw Error('O CPF deve ter 11 números. Retire algarismos')
    }


    //certificando verificador 1
    let soma = 0
    let verificador1=0
    for (let index = 0; index < 9; index++) {
      soma += CpfArray[index] *(index+1)
    }
    verificador1 = soma%11
    if (verificador1===10){verificador1=0}
    
    if(verificador1!=CpfArray[9]){
       return 'Seu Cpf NÃO é válido. Primeiro dígito de verficação não confere'
    }
 
    //certificando verificador 2
    soma = 0
    let verificador2=0
    for (let index = 0; index < 10; index++) {
      soma += CpfArray[index] *index
    }
    verificador2 = soma%11
    console.log(verificador2)
    if (verificador2===10){verificador2=0}
    console.log(verificador2)
    if(verificador2!==CpfArray[10]){
      return 'Seu Cpf NÃO é válido. Segundo dígito de verficação não confere'
    }

      return 'Seu Cpf é válido'
    
  }
}

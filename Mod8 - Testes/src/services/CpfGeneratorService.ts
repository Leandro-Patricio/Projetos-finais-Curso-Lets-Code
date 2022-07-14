export class CpfGeneratorService {
  constructor() {}

  getCpfGenerator=()=>{

    let CpfGerado:Array<number>=[]
    let respostaFinal:any
    let somaVerificador1=0
    let somaVerificador2=0

    for (let index = 0; index < 9; index++) {
      CpfGerado[index]=Math.floor(Math.random()*10) 
      somaVerificador1 += CpfGerado[index] *(index+1)
      somaVerificador2 += CpfGerado[index] *index
    }

    //criando verificador1
    let verificador1=somaVerificador1%11
    if (verificador1===10){verificador1=0}
    CpfGerado[9]=verificador1

    // criando verificador2
    somaVerificador2 += CpfGerado[9] * 9
    let verificador2=somaVerificador2%11
    if (verificador2===10){verificador2=0}
    CpfGerado[10]=verificador2

    respostaFinal=CpfGerado.toString()
    respostaFinal=respostaFinal.replaceAll(',','')

    return respostaFinal
    
  }
}

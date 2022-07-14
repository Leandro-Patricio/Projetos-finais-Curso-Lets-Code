export class LoremIpsumService {
  constructor() {}

  getLoremIpsum=(numPalavras:number)=>{ 

    const {palavrasAleatorias}= require('./palavrasAleatorias.js')
    let loremIpsum:string ='' 
    //let loremIpsum2:string ='' 
    let escolhaAleatoria:number = 0
    let palavraDaVez:string=''
    const palavrasAleatoriasLength:number = palavrasAleatorias.length
    let contadorPontuacao:number=0 
    let colocarVirgula:number=0
    let colocarPontoFinal:number=0
    let letraMaiuscula:number=0
    let palavraComLetraMaiuscula:string=''
    
    for (let index = 0; index < Number(numPalavras) ; index++) {
      escolhaAleatoria = Math.floor(Math.random()*palavrasAleatoriasLength)
      palavraDaVez = palavrasAleatorias[escolhaAleatoria]
      contadorPontuacao ++
      //loremIpsum2 += palavrasAleatorias[escolhaAleatoria] + " "
     
      if (contadorPontuacao>=4 && index!=numPalavras-1){
        colocarVirgula = Math.floor(Math.random() *2)
        if (!colocarVirgula){
          colocarPontoFinal = Math.floor(Math.random() *2)
          if (colocarPontoFinal){
          contadorPontuacao=0
          loremIpsum += palavraDaVez + '.' + " "
          letraMaiuscula = 1

          } else if (!colocarPontoFinal){
            loremIpsum += palavraDaVez + ' '
          }

        } else if (colocarVirgula) {
          contadorPontuacao=0
          loremIpsum += palavraDaVez + ',' + " "
        }

      }else if (index!=numPalavras-1){
        if (letraMaiuscula){
          palavraComLetraMaiuscula =palavraDaVez.charAt(0).toUpperCase() + palavraDaVez.slice(1); 
          loremIpsum += palavraComLetraMaiuscula + ' '
          letraMaiuscula=0

        } else if (!letraMaiuscula){
          loremIpsum += palavraDaVez + ' '
        }

      }else if (index>=numPalavras-1){
        loremIpsum += palavraDaVez + '.'
      
      }

    }

    //loremIpsum2=loremIpsum2.split(" ").slice(0, -1).join(" ")+"."
    return loremIpsum
  }
}
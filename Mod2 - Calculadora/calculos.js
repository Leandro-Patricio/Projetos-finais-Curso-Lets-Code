function dis(val)
{
  
  document.getElementById("expressaoMatematica").value+=val
  
  if (val == "**"){
    document.getElementById("display").value+="^"
  } else if (val == "**(1/2)"){
    insereSimbolo("√")
  } else {
    document.getElementById("display").value+=val
  }
}

function backspace()
{
  let x = document.getElementById("display").value
  document.getElementById("display").value = x.slice(0,-1)

  let z = document.getElementById("expressaoMatematica").value
  document.getElementById("expressaoMatematica").value = z.slice(0,-1)
}

function pi()
{
  document.getElementById("display").value += "𝛑"
  document.getElementById("expressaoMatematica").value += Math.PI
}
  
function resolver()
{
    let z = document.getElementById("expressaoMatematica").value
    let w = eval(z)
  
    document.getElementById("historicoAntigo").value += document.getElementById("display").value +  (" = ") + w + ("\n")
    document.getElementById("expressaoMatematica").value = w
    document.getElementById("display").value = w

    if (z === ""){
      document.getElementById("expressaoMatematica").value = ""
      document.getElementById("display").value = ""
    }
  }
  
function limpa()
{
    document.getElementById("display").value = ""
    document.getElementById("expressaoMatematica").value = ""
}

function limpaHistorico()
{
    document.getElementById("historicoAntigo").value = ""
}

function insereSimbolo(simbolo) {
  let displaySplit = document.getElementById("display").value.split("")
  for (let index = displaySplit.length; index >= 0; index--) {
    
    if (displaySplit[index] == ")" ) {

      posicaoSimbolo = displaySplit.indexOf("(",length.displaySplit)
      if (posicaoSimbolo != -1){
        displaySplit.splice(posicaoSimbolo, 0, simbolo);
        document.getElementById("display").value=displaySplit.join("")
        break
      } else if (posicaoSimbolo === -1){
        document.getElementById("display").value = "Error"
        break
      } 

      
    } else if (displaySplit[index] == "+" ||
              displaySplit[index] == "-" ||
              displaySplit[index] == "*" ||
              displaySplit[index] == "/" ) {

          displaySplit.splice(index+1, 0, simbolo);
          document.getElementById("display").value=displaySplit.join("")
          break
    } 
    

    if ( index === 0){
      displaySplit.splice(index, 0, simbolo);
      document.getElementById("display").value=displaySplit.join("")
      break
    }
  }
}

function trigonometria(senCos) {
  let displaySplit = document.getElementById("display").value.split("")
  let expressaoMatematicaSplit = document.getElementById("expressaoMatematica").value.split("")

  for (let index = displaySplit.length; index >= 0; index--) {
    
    if (displaySplit[index] == ")" ) {
      
      posicaoSimbolo = displaySplit.indexOf("(",length.displaySplit)
      if (posicaoSimbolo != -1){
        
        displaySplit.splice(posicaoSimbolo, 0, senCos);
        document.getElementById("display").value=displaySplit.join("")

        posicaoExpressaoMatematica = expressaoMatematicaSplit.indexOf("(",length.posicaoExpressaoMatematica)
        expressaoMatematicaSplitDeslocada = expressaoMatematicaSplit.slice(posicaoExpressaoMatematica, expressaoMatematicaSplit.length);
        expressaoMatematicaSplit=expressaoMatematicaSplit.slice(0,posicaoExpressaoMatematica);
        
        if (senCos == "Sen"){
          expressaoMatematicaCalculada = Math.sin(eval(expressaoMatematicaSplitDeslocada.join("")))
        }else if (senCos == "Cos"){
          expressaoMatematicaCalculada = Math.cos(eval(expressaoMatematicaSplitDeslocada.join("")))
        }
  
        document.getElementById("expressaoMatematica").value=expressaoMatematicaSplit.join("")+expressaoMatematicaCalculada
        break

      } else if (posicaoSimbolo === -1){
        document.getElementById("display").value = "Error"
        break
      } 

      
    } else if (displaySplit[index] == "+" ||
              displaySplit[index] == "-" ||
              displaySplit[index] == "*" ||
              displaySplit[index] == "/" ) {

          displaySplit.splice(index+1, 0, senCos);
          document.getElementById("display").value=displaySplit.join("")
          
          posicaoExpressaoMatematica = expressaoMatematicaSplit.indexOf(displaySplit[index],-2)
          expressaoMatematicaSplitDeslocada = expressaoMatematicaSplit.slice(posicaoExpressaoMatematica+1, expressaoMatematicaSplit.length);
          expressaoMatematicaSplit=expressaoMatematicaSplit.slice(0,posicaoExpressaoMatematica+1);
          
          if (senCos == "Sen"){
            expressaoMatematicaCalculada = Math.sin(eval(expressaoMatematicaSplitDeslocada.join("")))
          }else if (senCos == "Cos"){
            expressaoMatematicaCalculada = Math.cos(eval(expressaoMatematicaSplitDeslocada.join("")))
          }

          document.getElementById("expressaoMatematica").value=expressaoMatematicaSplit.join("")+expressaoMatematicaCalculada
          break
    } 
    

    if (index === 0){
      displaySplit.splice(index, 0, senCos);
      document.getElementById("display").value=displaySplit.join("")
      // document.getElementById("historicoAntigo").value +=  document.getElementById("display").value
      
      if (senCos == "Sen"){
        expressaoMatematicaCalculada = Math.sin(eval(expressaoMatematicaSplit.join("")))
      }else if (senCos == "Cos"){
        expressaoMatematicaCalculada = Math.cos(eval(expressaoMatematicaSplit.join("")))
      }
      document.getElementById("expressaoMatematica").value=expressaoMatematicaCalculada

      break
    }
  }
}

function openCloseHistorico() {
  let k = document.getElementById("historicoAntigo");
  let g =  document.getElementById("historico")
  if (k.style.display == "block") {
    k.style.display = "none";
    g.style.display="none"
  } else {
    k.style.display = "block";
    g.style.display="block"
  }
} 

function openCloseExpressaoMatematica() {
  let u = document.getElementById("expressaoMatematica");
  if (u.style.display == "inline") {
    u.style.display = "none";
  } else {
    u.style.display = "inline";
  }
} 
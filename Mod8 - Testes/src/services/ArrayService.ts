export class ArrayService {
  constructor() {}

  getReordenaAll=(arr: Array<string | number>, crescente:boolean, unico:boolean)=>{
    if(unico){
      arr = arr.filter((value, index, self) => self.indexOf(value) === index);
    }
    
    if(crescente){
      return arr.sort()
    }
    if (!crescente){ 
      return arr.sort((a, b) => (a > b ? -1 : 1))
    }
  }
}

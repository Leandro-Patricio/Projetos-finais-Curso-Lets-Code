import { Request, Response, NextFunction } from "express";
import { ArrayService } from "../../../services/ArrayService";

interface ArrayRequest {
  arr: Array<string | number>; 
  crescente?:boolean;
  unico?:boolean;
}

export class PostArrayController {
  #service: ArrayService;

  constructor() {
    this.#service = new ArrayService();
  }

  getReordenaAll = (req: Request<ArrayRequest>, res: Response, next: NextFunction) => {
    let arr = req.body.arr;
    let crescente = req.body.crescente
    let unico = req.body.unico

    return res.status(200).json({
      result: this.#service.getReordenaAll(arr as Array<string | number>, Boolean(crescente), Boolean(unico)),
    });
  };

/*   getArray = (req: Request<ArrayRequest>, res: Response, next: NextFunction) =>{
    let arr = req.body.arr;
    let crescente = req.body.crescente
    let unico = req.body.unico

    if (crescente){
      arr = this.#service.getCrescente(arr as Array<string | number>)
    } else {
      arr = this.#service.getDecrescente(arr as Array<string | number>)
    }

    if (unico){
      arr = this.#service.getUnico(arr as Array<string | number>)
    }

    return res.status(200).json({
      result: this.#service.getArray(arr as Array<string | number>),
    }); */
  }


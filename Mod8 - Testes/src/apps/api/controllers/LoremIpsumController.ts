import { Request, Response, NextFunction } from "express";
import { LoremIpsumService } from "../../../services/LoremIpsumService";

interface LoremIpsumRequest {
  numPalavras: number; 
}

export class LoremIpsumController {
  #service: LoremIpsumService;

  constructor() {
    this.#service = new LoremIpsumService();
  }

  getGeraLoremIpsum = (req: Request<LoremIpsumRequest>, res: Response, next: NextFunction) => {
    let {numPalavras} = req.query;

    return res.status(200).json({
      result: this.#service.getLoremIpsum(Number(numPalavras)),
    });
  };
  }


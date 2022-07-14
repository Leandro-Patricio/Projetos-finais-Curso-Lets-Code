import { Request, Response, NextFunction } from "express";
import { CpfCheckerService } from "../../../services/CpfCheckerService";

interface CpfCheckerRequest {
  Cpf: number; 
}

export class CpfCheckerController {
  #service: CpfCheckerService;

  constructor() {
    this.#service = new CpfCheckerService();
  }

  getCpfChecker = (req: Request<CpfCheckerRequest>, res: Response, next: NextFunction) => {
    let {Cpf} = req.query;

    return res.status(200).json({
      result: this.#service.getCpfChecker(Number(Cpf)),
    });
  };
  }


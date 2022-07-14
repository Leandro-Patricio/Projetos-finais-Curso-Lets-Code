import { Request, Response, NextFunction } from "express";
import { CpfGeneratorService } from "../../../services/CpfGeneratorService";

/* interface CpfGeneratorRequest {
  Cpf: number;
} */

export class CpfGeneratorController {
  #service: CpfGeneratorService;

  constructor() {
    this.#service = new CpfGeneratorService();
  }

  getCpfGenerator = (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({
      result: this.#service.getCpfGenerator(),
    });
  };
}


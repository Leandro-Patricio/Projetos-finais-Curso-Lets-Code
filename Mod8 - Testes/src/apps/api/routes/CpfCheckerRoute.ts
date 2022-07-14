import express from "express";
import { CpfCheckerController } from "../controllers/CpfCheckerController";

const CpfCheckerRouter = express.Router();
const _controller = new CpfCheckerController();

CpfCheckerRouter.get("/CpfChecker", _controller.getCpfChecker);

export = CpfCheckerRouter;

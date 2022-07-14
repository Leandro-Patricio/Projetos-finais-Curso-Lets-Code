import express from "express";
import { CpfGeneratorController } from "../controllers/CpfGeneratorController";

const CpfGeneratorRouter = express.Router();
const _controller = new CpfGeneratorController();

CpfGeneratorRouter.get("/CpfGenerator", _controller.getCpfGenerator);

export = CpfGeneratorRouter;

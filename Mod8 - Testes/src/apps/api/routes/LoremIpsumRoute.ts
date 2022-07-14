import express from "express";
import { LoremIpsumController } from "../controllers/LoremIpsumController";

const LoremIpsumRouter = express.Router();
const _controller = new LoremIpsumController();

LoremIpsumRouter.get("/loremIpsum", _controller.getGeraLoremIpsum);

export = LoremIpsumRouter;

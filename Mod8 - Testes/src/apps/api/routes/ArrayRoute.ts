import express from "express";
import { PostArrayController } from "../controllers/PostArrayController";

const arrayRouter = express.Router();
const _controllerPost = new PostArrayController();

arrayRouter.post("/reordena", _controllerPost.getReordenaAll);

export = arrayRouter;

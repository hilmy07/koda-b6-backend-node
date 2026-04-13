import { Router } from "express";
import * as cartController from "../controllers/carts.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const cartRouter = Router();

cartRouter.post("", authMiddleware, cartController.createCart);

export default cartRouter;

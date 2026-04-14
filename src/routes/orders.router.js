import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const orderRouter = Router();

orderRouter.post("", authMiddleware, orderController.createOrder);

export default orderRouter;

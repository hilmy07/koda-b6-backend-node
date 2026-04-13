import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
// import * as usersController from "../controllers/users.controller.js";

const authRouter = Router();

authRouter.post("/new", authController.authRegister);
authRouter.post("", authController.authLogin);

export default authRouter;

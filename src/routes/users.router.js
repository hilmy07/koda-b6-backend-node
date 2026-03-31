import { Router } from "express";
import * as userController from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("", userController.getAllUsers);
userRouter.post("", userController.createUser);
userRouter.get("/:id", userController.getUserById);

export default userRouter;

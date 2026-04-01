import { Router } from "express";
import * as userController from "../controllers/users.controller.js";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("", authMiddleware, userController.getAllUsers);
userRouter.post("", userController.createUser);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

userRouter.post("/auth", authController.authLogin);

export default userRouter;

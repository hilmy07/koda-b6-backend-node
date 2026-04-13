import express from "express";
import userRouter from "./routes/users.router.js";
import productRouter from "./routes/products.router.js";
import authRouter from "./routes/auths.router.js";
import cartRouter from "./routes/carts.router.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);

export default app;

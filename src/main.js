import express from "express";
import { constants } from "node:http2";
import userRouter from "./routes/users.router.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.get("/", function (req, res) {
  res.status(constants.HTTP_STATUS_OK).json({
    success: true,
    message: "Backend is running well",
  });
});

app.listen(8888, function () {
  console.log(`App listening on port 8888`);
});

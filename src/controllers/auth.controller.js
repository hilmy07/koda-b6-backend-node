import { GenerateToken } from "../lib/jwt.js";
import * as userModel from "../models/users.model.js";
import argon2 from "argon2";

export const authLogin = async (req, res) => {
  const data = req.body;

  const user = await userModel.getUserByEmail(data.email);

  if (!user) {
    return res.json({
      success: false,
      message: "user not found",
    });
  }

  const isValid = await argon2.verify(user.password, data.password);

  if (!isValid) {
    return res.json({
      success: false,
      message: "wrong password",
    });
  }

  const token = GenerateToken({ id: user.id, email: user.email });

  res.json({
    success: true,
    message: "login success",
    result: user,
    token,
  });
};

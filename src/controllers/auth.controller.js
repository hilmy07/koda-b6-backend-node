import hashedPassword from "../lib/hash.js";
import { GenerateToken } from "../lib/jwt.js";
import * as userModel from "../models/users.model.js";

export async function authRegister(req, res) {
  try {
    const data = req.body;

    // hash password
    const hashedPassword = await argon2.hash(data.password);

    const newUser = await userModel.createUser(data.email, hashedPassword);

    res.json({
      success: true,
      message: "create user success",
      results: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
}

export const authLogin = async (req, res) => {
  const data = req.body;
  const user = await userModel.getUserByEmail(data.email);
  if (!user) {
    return res.json({
      success: false,
      message: "user not found",
    });
  }

  const isValid = hashedPassword(user.password, data.password);

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

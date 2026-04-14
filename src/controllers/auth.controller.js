import hashedPassword from "../lib/hash.js";
import { GenerateToken } from "../lib/jwt.js";
import * as userModel from "../models/users.model.js";
import argon2 from "argon2";

/**
 * @openapi
 * /auth/new:
 *   post:
 *     summary: Register user baru
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: create user success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: internal server error
 */
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
      success: false,
      message: "internal server error",
    });
  }
}

/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: hilmy@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: wrong password or user not found
 */
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

  // 🔥 FIX INI
  const token = await GenerateToken({
    id: user.id,
    email: user.email,
  });

  return res.json({
    success: true,
    message: "login success",
    result: user,
    token,
  });
};

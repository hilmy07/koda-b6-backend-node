import * as userModel from "../models/users.model.js";
import argon2 from "argon2";

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Ambil semua user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: list all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 result:
 *                   type: array
 *       500:
 *         description: internal server error
 */
export async function getAllUsers(_, res) {
  const users = await userModel.getAllUsers();
  res.json({
    success: true,
    message: "list all users",
    result: users,
  });
}

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Ambil user berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: detail user
 *       404:
 *         description: user not found
 */
export async function getUserById(req, res) {
  const id = parseInt(req.params.id);
  console.log(id);
  const user = await userModel.getUserById(id);
  res.json({
    success: true,
    message: "detail user",
    result: user,
  });
}

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Update user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: update user success
 *       404:
 *         description: user not found
 */
export async function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const { email, password } = req.body;

  const updatedUser = await userModel.updateUser(id, email, password);

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  res.json({
    success: true,
    message: "update user success",
    results: updatedUser,
  });
}

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Hapus user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: delete user success
 */
export async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  const _ = await userModel.deleteUser(id);
  const users = await userModel.getAllUsers();

  res.json({
    success: true,
    message: "delete user success",
    results: users,
  });
}

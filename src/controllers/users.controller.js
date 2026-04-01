import * as userModel from "../models/users.model.js";
import argon2 from "argon2";

export async function getAllUsers(_, res) {
  const users = await userModel.getAllUsers();
  res.json({
    success: true,
    message: "list all users",
    result: users,
  });
}

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

export async function createUser(req, res) {
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

export async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  const delUser = await userModel.deleteUser(id);
  const users = await userModel.getAllUsers();

  res.json({
    success: true,
    message: "delete user success",
    results: users,
  });
}

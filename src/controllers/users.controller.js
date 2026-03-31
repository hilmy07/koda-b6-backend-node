import * as userModel from "../models/users.model.js";

export async function getAllUsers(_, res) {
  const users = await userModel.getAllUsers();
  res.json({
    success: true,
    message: "list all users",
    result: users,
  });
}

export async function getUserById(req, res) {
  const id = req.param.id;
  const user = await userModel.getUserById(id);
  res.json({
    success: true,
    message: "detail user",
    result: user,
  });
}

export async function createUser(req, res) {
  const data = req.body;
  const newUser = await userModel.createUser(data);

  res.json({
    success: true,
    message: "create user success",
    results: newUser,
  });
}

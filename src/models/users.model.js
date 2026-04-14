import pool from "../lib/db.js";

const usersData = [];

export async function getAllUsers() {
  const result = await pool.query(
    "SELECT id, email, password FROM users ORDER BY id ASC",
  );
  return result.rows;
}

export const getUserById = async (id) => {
  const found = await pool.query(
    "SELECT id, email, password FROM users WHERE id=$1",
    [id],
  );
  return found.rows;
};

export const getUserByEmail = async (email) => {
  const found = await pool.query(
    "SELECT id, email, password FROM users WHERE email=$1",
    [email],
  );
  return found.rows[0];
};

let incrementID = usersData.length + 1;

export const createUser = async (email, password) => {
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, password],
  );
  return result.rows[0];
};

export const updateUser = async (
  id,
  email,
  password,
  fullname,
  phone,
  address,
) => {
  const result = await pool.query(
    "UPDATE users SET email = $1, password = $2, fullname = $3, phone = $4, address = $5 WHERE id=$6 RETURNING id,email,password, fullname, phone, address",
    [email, password, fullname, phone, address, id],
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING NULL",
    [id],
  );
  return result.rows[0];
};

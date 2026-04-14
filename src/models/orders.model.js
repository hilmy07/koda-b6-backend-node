import pool from "../lib/db.js";

export const createOrder = async ({
  cart_id,
  total,
  status,
  fullname,
  phone,
  email,
  address,
  delivery,
}) => {
  const result = await pool.query(
    `
    INSERT INTO orders 
    (cart_id, total, status, fullname, phone, email, address, delivery, created_at, updated_at) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW(),NOW())

    RETURNING *;
    `,
    [cart_id, total, status, fullname, phone, email, address, delivery],
  );

  return result.rows[0];
};

export const getOrders = async (id) => {
  const result = await pool.query(
    "SELECT o.cart_id, o.total, o.status, o.fullname, o.phone, o.email, o.address, o.delivery FROM orders o LEFT JOIN carts c ON o.cart_id=c.id LEFT JOIN users u ON c.user_id=u.id WHERE u.id=$1",
    [id],
  );

  return result.rows;
};

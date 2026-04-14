import pool from "../lib/db.js";

export const createCartItem = async ({
  quantity,
  size,
  variant,
  user_id,
  product_id,
}) => {
  const result = await pool.query(
    `
    INSERT INTO carts 
    (quantity, size, variant, user_id, product_id, created_at, updated_at) 
    VALUES ($1,$2,$3,$4,$5,NOW(),NOW())

    ON CONFLICT (user_id, product_id, size, variant) 
    DO UPDATE 
    SET 
      quantity = carts.quantity + EXCLUDED.quantity,
      updated_at = NOW()

    RETURNING *;
    `,
    [quantity, size, variant, user_id, product_id],
  );

  return result.rows[0];
};

export const getCarts = async () => {
  const result = await pool.query(
    "SELECT u.fullname, p.name_product, c.quantity, c.size, c.variant FROM carts c LEFT JOIN users u ON c.user_id=u.id LEFT JOIN products p ON c.product_id=p.id",
  );

  return result.rows;
};

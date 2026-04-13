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

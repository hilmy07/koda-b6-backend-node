import pool from "../lib/db.js";

export async function getAllProducts(page) {
  const limit = 6;

  const offset = (page - 1) * limit;
  //   var total;

  const totalProduct = await pool.query(
    "SELECT COUNT(*) AS total FROM products",
  );

  console.log(totalProduct.rows);

  const result = await pool.query(
    "SELECT p.id, p.name_product, p.description, p.base_price, pi.path, pr.rating FROM products p LEFT JOIN product_images pi ON pi.product_id = p.id LEFT JOIN product_reviews pr ON pr.product_id = p.id GROUP BY p.id, pi.path, pr.rating ORDER BY p.id ASC LIMIT $1 OFFSET $2",
    [limit, offset],
  );
  return result.rows;
}

export async function getRecommendedProducts() {
  const limit = 4;

  const result = await pool.query(
    "SELECT p.id, p.name_product, p.description, p.base_price, pi.path, pr.rating FROM products p LEFT JOIN product_images pi ON pi.product_id = p.id LEFT JOIN product_reviews pr ON pr.product_id = p.id GROUP BY p.id, pi.path, pr.rating HAVING AVG(pr.rating) > 4  ORDER BY p.id ASC LIMIT $1",
    [limit],
  );
  return result.rows;
}

export const getDetailProduct = async (id) => {
  const found = await pool.query(
    `SELECT
      p.id,
      p.name_product,
      p.description,
      p.base_price,

      COALESCE(
        ARRAY(
          SELECT pi.path
          FROM product_images pi
          WHERE pi.product_id = p.id
          LIMIT 4
        ),
        '{}'::text[]
      ) AS images,

      COALESCE(
        (SELECT AVG(pr.rating) FROM product_reviews pr WHERE pr.product_id = p.id),
        0
      ) AS rating,

      COALESCE(
        (SELECT COUNT(*) FROM product_reviews pr WHERE pr.product_id = p.id),
        0
      ) AS review_count,

      COALESCE(
        ARRAY(
          SELECT s.size_name
          FROM product_sizes ps
          JOIN sizes s ON ps.size_id = s.id
          WHERE ps.product_id = p.id
          AND s.id IN (1,3,4)
          LIMIT 3
        ),
        '{}'::text[]
      ) AS sizes,

      COALESCE(
        ARRAY(
          SELECT v.variant_name
          FROM product_variants pv
          JOIN variants v ON pv.variant_id = v.id
          WHERE pv.product_id = p.id
          LIMIT 2
        ),
        '{}'::text[]
      ) AS variants

    FROM products p
    WHERE p.id = $1`,
    [id],
  );

  return found.rows[0];
};

export const createProduct = async (
  name_product,
  description,
  base_price,
  stock,
) => {
  const result = await pool.query(
    "INSERT INTO products (name_product, description, base_price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [name_product, description, base_price, stock],
  );
  return result.rows[0];
};

export const updateProduct = async (
  id,
  name_product,
  description,
  base_price,
  stock,
) => {
  const result = await pool.query(
    "UPDATE products SET name_product = $1, description = $2, base_price = $3, stock = $4 WHERE id=$5 RETURNING id,name_product,description,base_price,stock",
    [name_product, description, base_price, stock, id],
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id=$1 RETURNING NULL",
    [id],
  );
  return result.rows[0];
};

export const getProductReviews = async () => {
  const result = await pool.query(
    "SELECT p.name_product, COALESCE(u.fullname, '') AS Name, pr.message FROM product_reviews pr LEFT JOIN products p ON pr.product_id=p.id LEFT JOIN users u ON pr.user_id=u.id",
  );

  return result.rows;
};

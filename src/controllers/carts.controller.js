import * as cartModel from "../models/carts.model.js";

/**
 * @openapi
 * /carts:
 *   post:
 *     summary: Tambah item ke cart
 *     description: Menambahkan produk ke cart user (user_id diambil dari token JWT)
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               size:
 *                 type: string
 *                 example: Medium
 *               variant:
 *                 type: string
 *                 example: Ice
 *     responses:
 *       200:
 *         description: berhasil tambah ke cart
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
 *                   type: object
 *       400:
 *         description: validasi error
 *       401:
 *         description: unauthorized (token tidak valid)
 *       500:
 *         description: internal server error
 */
export async function createCart(req, res) {
  try {
    const { quantity, size, variant, product_id } = req.body;

    const user_id = req.user.id; // ✅ dari token

    if (!product_id || !quantity) {
      return res.status(400).json({
        success: false,
        message: "product_id dan quantity wajib",
      });
    }

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "quantity harus angka > 0",
      });
    }

    const cart = await cartModel.createCartItem({
      quantity: parseInt(quantity),
      size: size || null,
      variant: variant || null,
      user_id,
      product_id: parseInt(product_id),
    });

    res.json({
      success: true,
      message: "berhasil tambah ke cart",
      result: cart,
    });
  } catch (error) {
    console.log("ERROR createCart:", error);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

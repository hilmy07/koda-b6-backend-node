import * as orderModel from "../models/orders.model.js";

// cart_id, total, status, fullname, phone, email, address, delivery

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Tambah order
 *     description: Menambahkan cart ke order user (user_id diambil dari token JWT)
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: integer
 *                 example: 1
 *               total:
 *                 type: number
 *                 example: 103000
 *               status:
 *                 type: integer
 *                 example: 1
 *               fullname:
 *                 type: string
 *                 example: hilmy
 *               phone:
 *                 type: string
 *                 example: 08113777474
 *               email:
 *                 type: string
 *                 example: hilmy@mail.com
 *               address:
 *                 type: string
 *                 example: Surabaya
 *               delivery:
 *                 type: string
 *                 example: Dine In
 *     responses:
 *       200:
 *         description: berhasil tambah ke order
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
export async function createOrder(req, res) {
  try {
    const {
      cart_id,
      total,
      status,
      fullname,
      phone,
      email,
      address,
      delivery,
    } = req.body;

    const user_id = req.user.id; // ✅ dari token

    const order = await orderModel.createOrder({
      cart_id,
      total,
      status,
      fullname,
      phone,
      email,
      address,
      delivery,
    });

    res.json({
      success: true,
      message: "berhasil tambah ke order",
      result: order,
    });
  } catch (error) {
    console.log("ERROR createOrder:", error);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

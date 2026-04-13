import * as cartModel from "../models/carts.model.js";

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

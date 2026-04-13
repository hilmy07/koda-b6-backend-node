import * as productsModel from "../models/products.model.js";

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Ambil semua produk
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: list all products
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
 *                   type: array
 */
export async function getAllProducts(req, res) {
  const page = parseInt(req.query.page);
  const products = await productsModel.getAllProducts(page);
  res.json({
    success: true,
    message: "list all products",
    result: products,
  });
}

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Ambil detail product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: success get product detail
 *       400:
 *         description: invalid product id
 *       404:
 *         description: product not found
 */
export async function getDetailProduct(req, res) {
  try {
    let id = parseInt(req.params.id);

    // ✅ validasi id
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "invalid product id",
      });
    }

    const product = await productsModel.getDetailProduct(id);

    // ✅ kalau tidak ditemukan
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.json({
      success: true,
      message: "success get product detail",
      result: product,
    });
  } catch (error) {
    console.log("ERROR getDetailProduct:", error);

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

/**
 * @openapi
 * /products/reviews:
 *   get:
 *     summary: Ambil review produk
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: list product reviews
 */
export async function getProductReviews(_, res) {
  const product_reviews = await productsModel.getProductReviews();

  res.json({
    success: true,
    message: "list product reviews",
    result: product_reviews,
  });
}

/**
 * @openapi
 * /products/recommended:
 *   get:
 *     summary: Ambil produk rekomendasi
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: list recommended products
 */
export async function getRecommendedProducts(_, res) {
  //   const page = parseInt(req.query.page);
  const products = await productsModel.getRecommendedProducts();
  res.json({
    success: true,
    message: "list all recommended products",
    result: products,
  });
}

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Tambah product baru
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_product
 *               - description
 *               - base_price
 *               - stock
 *             properties:
 *               name_product:
 *                 type: string
 *                 example: Kopi Latte
 *               description:
 *                 type: string
 *                 example: Minuman kopi susu
 *               base_price:
 *                 type: number
 *                 example: 25000
 *               stock:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: create product success
 */
export async function createProduct(req, res) {
  try {
    const data = req.body;

    const newProduct = await productsModel.createProduct(
      data.name_product,
      data.description,
      data.base_price,
      data.stock,
    );

    res.json({
      success: true,
      message: "create product success",
      results: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
}

/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     summary: Update product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_product:
 *                 type: string
 *               description:
 *                 type: string
 *               base_price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: update product success
 *       404:
 *         description: product not found
 */
export async function updateProduct(req, res) {
  const id = parseInt(req.params.id);
  const { name_product, description, base_price, stock } = req.body;

  const updatedProduct = await productsModel.updateProduct(
    id,
    name_product,
    description,
    base_price,
    stock,
  );

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  res.json({
    success: true,
    message: "update product success",
    results: updatedProduct,
  });
}

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Hapus product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: delete product success
 */
export async function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const _ = await productsModel.deleteProduct(id);
  const products = await productsModel.getAllProducts();

  res.json({
    success: true,
    message: "delete product success",
    results: products,
  });
}

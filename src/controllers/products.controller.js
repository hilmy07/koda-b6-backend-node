import * as productsModel from "../models/products.model.js";

export async function getAllProducts(req, res) {
  const page = parseInt(req.query.page);
  const products = await productsModel.getAllProducts(page);
  res.json({
    success: true,
    message: "list all products",
    result: products,
  });
}

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

export async function getProductReviews(_, res) {
  const product_reviews = await productsModel.getProductReviews();

  res.json({
    success: true,
    message: "list product reviews",
    result: product_reviews,
  });
}

export async function getRecommendedProducts(_, res) {
  //   const page = parseInt(req.query.page);
  const products = await productsModel.getRecommendedProducts();
  res.json({
    success: true,
    message: "list all recommended products",
    result: products,
  });
}

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

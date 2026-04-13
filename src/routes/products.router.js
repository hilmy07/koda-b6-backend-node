import { Router } from "express";
import * as productController from "../controllers/products.controller.js";

const productRouter = Router();

productRouter.get("", productController.getAllProducts);
productRouter.get("/:id", productController.getDetailProduct);
productRouter.get("/recommended", productController.getRecommendedProducts);
productRouter.post("", productController.createProduct);
productRouter.patch("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

productRouter.get("/reviews", productController.getProductReviews);

export default productRouter;

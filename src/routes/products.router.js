import { Router } from "express";
import * as productController from "../controllers/products.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const productRouter = Router();

productRouter.get("", productController.getAllProducts);
productRouter.get("/recommended", productController.getRecommendedProducts);
productRouter.get("/reviews", productController.getProductReviews);
productRouter.get("/:id", productController.getDetailProduct);
productRouter.post("", authMiddleware, productController.createProduct);
productRouter.patch("/:id", authMiddleware, productController.updateProduct);
productRouter.delete("/:id", authMiddleware, productController.deleteProduct);

export default productRouter;

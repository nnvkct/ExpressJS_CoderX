import express from "express";
import { productController } from "../controllers/product.controller.js";
import { productValidate } from "../validate/product.validate.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import multer from "multer";

var router = express.Router();
const upload = multer({ dest: "/sandbox/src/public/productImage/" });

router.get("/", productController.index);
router.get("/create", authMiddleware.requireAuth, productController.create);
router.post(
  "/create",
  upload.single("image"),
  productValidate.createProduct,
  productController.createNewProduct
);

export default router;

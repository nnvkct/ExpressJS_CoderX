import express from "express";
import { productController } from "../controllers/product.controller.js";

var router = express.Router();

router.get("/", productController.index);

export default router;

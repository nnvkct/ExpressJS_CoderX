import express from "express";
import { cartController } from "../controllers/cart.controller.js";

var router = express.Router();

router.get("/", cartController.index);
router.get("/add/:productId", cartController.add);

export default router;

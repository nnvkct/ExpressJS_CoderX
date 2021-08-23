import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { authValidate } from "../validate/auth.validate.js";

var router = express.Router();

router.get("/", authController.index);
router.post("/", authValidate.login, authController.login);

export default router;

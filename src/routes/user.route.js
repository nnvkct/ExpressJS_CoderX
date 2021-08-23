import express from "express";
import userController from "../controllers/user.controller.js";

var router = express.Router();

router.get("/", userController.index);

router.get("/create", userController.create);

router.get("/view/:id", userController.viewById);

router.get("/delete/:id", userController.deleteUserId);

router.get("/search", userController.searchUserId);

router.post("/create", userController.createNewUser);

export default router;

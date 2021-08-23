import express from "express";
import { userController } from "../controllers/user.controller.js";
import { userValidate } from "../validate/user.validate.js";

var router = express.Router();

router.get("/", userController.index);

router.get("/create", userController.create);

router.get("/view/:id", userController.viewById);

router.get("/delete/:id", userController.deleteUserId);

router.get("/search", userController.searchUserId);

router.post("/create", userValidate.createUser, userController.createNewUser);

export default router;

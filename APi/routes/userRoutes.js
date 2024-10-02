import express, { Router } from "express";
import verifyToken from "../tokenverify.js";
import userController from "../controllers/userController.js";

const userRoute = express.Router()

userRoute.post('/upload/:id',verifyToken.verifyToken,userController.updateUser)

export default userRoute
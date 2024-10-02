import express from "express";
import authController from "../controllers/authController.js";
const route = express.Router()

route.post('/signup',authController.signUp)

route.post('/signin',authController.signIn)


export default route

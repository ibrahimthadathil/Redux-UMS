import express from "express";
import adminController from "../controllers/adminController.js";
import verifyToken from '../tokenverify.js'


const adRoute = express.Router()

adRoute.get('/dasboard',verifyToken.verifyToken,adminController.ShowDashboard)

adRoute.put('/edit/:id',adminController.editUser)
adRoute.post('/dash/create',adminController.createUser)
adRoute.put('/delete/:id',adminController.deleteUser)

export default adRoute
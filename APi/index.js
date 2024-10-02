import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from "./routes/userRoutes.js";
import authRoute from './routes/AuthRoute.js'
import cookieParser from "cookie-parser";
import adRoute from "./routes/adminRoute.js";

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected mongoDB');
    
})
const app = express()
app.use(express.json())
// app.use(express.urlencoded({extendedL:true}))
app.use(cookieParser())
app.use('/api',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/admin/',adRoute)

app.use((err,req,res,next)=>{
    
    const status  = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(status).json({
        success:false,
        message,
        status
    })
})


app.listen(3000,()=>{
    console.log('sever listenig on port 3000')
})



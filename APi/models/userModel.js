import mongoose from "mongoose";

const userSChema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        },
    email:{
        type:String,
        required:true,
        unique:true,
        macth: [/.+\@.+\..+/, "please use valid email"]
        
    },
    password:{
        type:String,
        required:true
        
    },
   
    profile:{
        type:String,
        default:"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
    },
    is_admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('User',userSChema)
export default User
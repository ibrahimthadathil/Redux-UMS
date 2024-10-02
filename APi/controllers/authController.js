import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    const exist = await User.findOne({ email });
    if(exist) return res.status(400).json({success:false,message:"email alreday exist"})
    const user = await User.create({
      userName: username,
      email,
      password: hashPassword,
    });
   
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    const expiryDate = new Date(Date.now() + 3600000)
    res.cookie('access_token',token,{httpOnly:true,expires:expiryDate})
    .status(200).json({ res:user, success: true,message:'successfully Registerd' });

  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

const signIn = async (req,res)=>{
  const {email,password} = req.body
  try {
    const exist = await User.findOne({email})

    if(!exist){
      res.status(400).json({success:false,message:'Not verified Account..!'})
    }else{
     const isMatch = await bcrypt.compare(password,exist.password)
      if(isMatch){
        const {password, ...rest} = exist._doc // destructering the data to avoid sending password
        const token = jwt.sign({id:exist._id},process.env.JWT_SECRET,)
        const expiryDate = new Date(Date.now() + 3600000)
        res.cookie('access_token',token,{httpOnly:true ,expires:expiryDate})
        .status(200).json({res:rest,success:true,message:'Logged In successfully..!'})
      }else{
        res.status(400).json({success:false,message:'Password Not Match..!'})
      }
    }
    
  } catch (error) {
    console.log(error.message);
    
  }
}

export default {
  signUp,
  signIn
};

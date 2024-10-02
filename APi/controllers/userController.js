import User from "../models/userModel.js"
// update user
 
const  updateUser =async (req,res,next)=>{
    try {
        const {username,email,img} = req.body        

        const exist = await User.findOne({email})
        
        if(req.user.id !== req.params.id  ){
            return  res.status(401).json('you are not authenticated')
        }
        else if(exist){
            res.status(401).json('email already exist')
        }
        else{

            let updateObject = {
                userName: req.body.username,
                email: req.body.email
              };
              
              if (img !== "") {
                updateObject.profile = img;
              }

            const updateduser = await User.findByIdAndUpdate(
                {_id:req.params.id},
                {$set:updateObject},
                {new:true})
                
                const {password,...rest} = updateduser._doc
                res.status(200).json({user:rest,msg:'updated successfully'})
        }
    } catch (error) {
        console.log(error.message);
        
    }
}


export default{
updateUser
}
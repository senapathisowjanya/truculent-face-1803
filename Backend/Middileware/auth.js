const jwt =require("jsonwebtoken")
const logoutModel = require("../Model/logout.schema")
require("dotenv").config()

const auth=async(req,res,next)=>{
    const {token}=req.cookies
    // console.log(token)

    try{
        const log=await logoutModel.findOne({token:token})
        if(!log){

        if(token){
            const decoded=jwt.verify(token,process.env.secret_key)
            if(decoded){
             req.body.userID=decoded.userID
             req.body.name=decoded.name
             next()
            }
        }else{
            res.json({msg:"Invalid token"})
        }
    }else{
        return res.json({msg:"Invalid token Please login Again"})
    }

    }catch(err){
       res.json({err:err.message})
    }

}

module.exports=auth
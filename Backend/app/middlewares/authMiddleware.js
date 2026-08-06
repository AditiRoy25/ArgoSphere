const jwt = require("jsonwebtoken");

const User = require("../models/user");


const AuthCheck = async (req,res,next)=>{

try{


    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : null;
    const token = req.cookies?.token || bearerToken;

    if(!token){


        return res.status(401).json({

            success:false,

            message:"Please login first"

        });

    }



    const decoded = jwt.verify(

        token,

        process.env.JWT_SECRET

    );



    // get fresh user from MongoDB

    const user = await User.findById(

        decoded.id

    );



    if(!user){

        return res.status(404).json({

            success:false,

            message:"User not found"

        });

    }



    req.user = {

        _id:user._id,
        id:user._id,

        name:user.name,

        email:user.email,

        role:user.role

    };

console.log("AUTH USER:", req.user);

    next();



}catch(error){


    return res.status(401).json({

        success:false,

        message:"Invalid token"

    });

}


};


module.exports = AuthCheck;







// const jwt=require('jsonwebtoken')

// const AuthCheck=(req,res,next)=>{
//     if(req.cookies && req.cookies.token){
//         jwt.verify(req.cookies.token,process.env.JWT_SECRET,(err,data)=>{
//             if(err){
//                 return res.status(400).json({
//                     status:false,
//                     message:"invalid token"
//                 })
//             }
//             req.user=data;


//             next();
//         })
//     }else{
//         next();
//     }
    
// }


// module.exports=AuthCheck




const {
  sendOTPEmail,
  sendResetPasswordEmail,
} = require("../utils/sendMail");

const User = require("../models/user");
const OTPModel = require("../models/otp");
const RefreshToken = require("../models/refreshToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const cloudinary = require("../config/cloudinary");

const logger = require("../utils/logger");

// for forget password
const crypto = require("crypto");

class AuthController {

  
  // Register User
  
  async register(req, res) {

  try {

    const { name, email, phone, password,role } = req.body;
console.log("rebody",req.body)

    const existUser = await User.findOne({ email });

    if (existUser) {

      return res.status(400).json({
        success:false,
        message:"User already exists"
      });

    }


    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(
      password,
      salt
    );


    let image = " ";

    let public_id = "";


    // IMAGE UPLOAD
    if (req.file) {

      logger.info("Uploading image", {
        file:req.file.path
      });


      try {

        const result = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder:"argo_Sphere/users",
            resource_type:"image"
          }
        );


        image = result.secure_url;

        public_id = result.public_id;


        logger.info("Cloudinary Upload Success", {
          public_id: result.public_id,
          url: result.secure_url
        });


        if (fs.existsSync(req.file.path)) {

          fs.unlinkSync(req.file.path);

        }


      } catch(uploadError) {


        logger.error("Cloudinary Upload Failed", {

          message: uploadError.message,

          http_code: uploadError.http_code

        });


        return res.status(500).json({

          success:false,

          message:"Image upload failed",

          error:uploadError.message

        });

      }

    }


    const user = await User.create({

      name,

      email,

      phone,

      password:hashPassword,

      image,

      public_id,
      role

    });


    await sendOTPEmail(user);


    logger.info("User Registered", {
      email:user.email
    });


    return res.status(201).json({

      success:true,

      message:"User registered successfully. OTP sent to email.",

      data:user

    });


  } catch(error){


    logger.error("REGISTER ERROR", {

      message:error.message,

      stack:error.stack

    });


    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

}
  
  // Login
  
 async login(req,res){

try{

const {email,password}=req.body || {};


// validation
if(!email || !password){

return res.status(400).json({

success:false,
message:"Email and password required"

});

}


// find user
const existingUser = await User.findOne({

email:email.toLowerCase().trim()

}).select("+password");



if(!existingUser){

return res.status(404).json({

success:false,
message:"User not found"

});

}


console.log(
"DATABASE VERIFY:",
existingUser.isVerified
);



// block check
if(existingUser.isBlocked){

return res.status(403).json({

success:false,
message:"Your account has been blocked"

});

}



// email verify check

if(!existingUser.isVerified){

return res.status(401).json({

success:false,
message:"Please verify your email first"

});

}




// password check

const isMatch = await bcrypt.compare(

password,

existingUser.password

);



if(!isMatch){

return res.status(400).json({

success:false,

message:"Invalid credentials"

});

}




// access token

// const accessToken = jwt.sign(

// {

// id:existingUser._id,

// name:existingUser.name,

// email:existingUser.email,

// role:existingUser.role

// },

// process.env.JWT_SECRET,

// {
// expiresIn:"1d"
// }

// );


const accessToken = jwt.sign(

{

id: existingUser._id

},

process.env.JWT_SECRET,

{
 expiresIn:"1d"
}

);




// refresh token

const refreshToken = jwt.sign(

{
id:existingUser._id
},

process.env.JWT_REFRESH_SECRET,

{
expiresIn:"7d"
}

);




// save cookies


res.cookie(
"token",
accessToken,
{
httpOnly:true,
secure:false,
maxAge:24*60*60*1000
}
);



res.cookie(
"refreshToken",
refreshToken,
{
httpOnly:true,
secure:false,
maxAge:7*24*60*60*1000
}
);




// remove old refresh token

await RefreshToken.deleteMany({

userId:existingUser._id

});




// save refresh token

await RefreshToken.create({

userId:existingUser._id,

token:refreshToken,

expiresAt:new Date(
Date.now()+7*24*60*60*1000
)

});





return res.status(200).json({

success:true,

message:"Login successful",

accessToken,

refreshToken,

user:{

_id:existingUser._id,

name:existingUser.name,

email:existingUser.email,

role:existingUser.role,

image:existingUser.image

}

});



}catch(error){

logger.error(error.message);


return res.status(500).json({

success:false,

message:error.message

});

}

}

async refreshToken(req,res){

try{


const refreshToken =
req.cookies.refreshToken;



if(!refreshToken){

return res.status(401).json({

success:false,

message:"Refresh token required"

});

}




// database check

const storedToken =
await RefreshToken.findOne({

token:refreshToken

});



if(!storedToken){

return res.status(401).json({

success:false,

message:"Invalid refresh token"

});

}




// verify token

const decoded = jwt.verify(

refreshToken,

process.env.JWT_REFRESH_SECRET

);





const user =
await User.findById(decoded.id);




if(!user){

return res.status(200).json({

success:true,

message:"If an account exists for this email, a reset link has been sent."

});

}




// new access token

const newAccessToken = jwt.sign(

{

id:user._id,

// email:user.email,

// role:user.role

},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);





// update access cookie

res.cookie(

"token",

newAccessToken,

{

httpOnly:true,

secure:false,

maxAge:24*60*60*1000

}

);




return res.status(200).json({

success:true,

message:"Token refreshed",

accessToken:newAccessToken

});



}catch(error){


logger.error(error.message);



return res.status(401).json({

success:false,

message:"Refresh token expired"

});

}

}




// Verify OTP


async verify(req,res){

try{


const {email,otp}=req.body;


console.log("VERIFY BODY",req.body);



if(!email || !otp){

return res.status(400).json({

success:false,

message:"Email and OTP are required"

});

}



const existingUser =
await User.findOne({

email:email.trim().toLowerCase()

});



if(!existingUser){

return res.status(404).json({

success:false,

message:"User not found"

});

}



// check otp

const otpData =
await OTPModel.findOne({

userId:existingUser._id,


otp:String(otp).trim()

});




if(!otpData){


return res.status(400).json({

success:false,

message:"Invalid or expired OTP"

});

}




// update user

existingUser.isVerified=true;


await existingUser.save();




// delete otp

await OTPModel.deleteMany({

userId:existingUser._id

});





return res.status(200).json({

success:true,

message:"Email verified successfully"

});





}catch(error){


return res.status(500).json({

success:false,

message:error.message

});

}

}

// Resend OTP



async resendOTP(req, res) {

  try {

    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    await OTPModel.deleteMany({
      userId: user._id,
    });

   await sendOTPEmail(user);

    logger.info(`OTP Resent : ${user.email}`);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    logger.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}



// Get Profile


// async getProfile(req, res) {

//   try {

//     const user = await User.findById(req.user.id).select("-password");

//     if (!user) {

//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });

//     }

//     return res.status(200).json({

//       success: true,

//       data: user,

//     });

//   } catch (error) {

//     logger.error(error.message);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// }



// User Dashboard



async dashboard(req, res) {

  try {

    return res.status(200).json({

      success: true,

      message: "Welcome User Dashboard",

      user: req.user,

    });

  } catch (error) {

    logger.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}


// Admin Dashboard



// async adminDashboard(req, res) {

//   try {

//     return res.status(200).json({

//       success: true,

//       message: "Welcome Admin Dashboard",

//       admin: req.user,

//     });

//   } catch (error) {

//     logger.error(error.message);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// }

// async updateProfile(req, res) {
//   try {

//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (req.body.name) user.name = req.body.name;
//     if (req.body.phone) user.phone = req.body.phone;

//     if (req.file) {

//       // Delete old image
//       if (user.public_id) {

//         await cloudinary.uploader.destroy(user.public_id);

//         logger.info(`Old image deleted : ${user.public_id}`);

//       }

//       // Upload new image
//       const result = await cloudinary.uploader.upload(
//         req.file.path,
//         {
//           folder: "argo_Sphere/users",
//         }
//       );

//       user.image = result.secure_url;
//       user.public_id = result.public_id;

//       logger.info(`New image uploaded : ${result.public_id}`);

//       if (fs.existsSync(req.file.path)) {
//         fs.unlinkSync(req.file.path);
//       }

//     }

//     await user.save();

//     logger.info(`Profile Updated : ${user.email}`);

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: user,
//     });

//   } catch (error) {

//     logger.error(error.message);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// }

async deleteUser(req, res) {

  try {

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    if (user.public_id) {

      await cloudinary.uploader.destroy(user.public_id);

      logger.info(`Image Deleted : ${user.public_id}`);

    }

    await User.findByIdAndDelete(req.user.id);

    logger.info(`User Deleted : ${user.email}`);

    return res.status(200).json({

      success: true,

      message: "Account deleted successfully",

    });

  } catch (error) {

    logger.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

}


// async changePassword(req,res){

// try{


// const {
//     oldPassword,
//     newPassword
// }=req.body;


// if(!oldPassword || !newPassword){

// return res.status(400).json({

// success:false,

// message:"Old and new password required"

// });

// }


// const user = await User.findById(
//     req.user.id
// ).select("+password");



// if(!user){

// return res.status(404).json({

// success:false,

// message:"User not found"

// });

// }



// const isMatch =
// await bcrypt.compare(
//     oldPassword,
//     user.password
// );



// if(!isMatch){

// return res.status(400).json({

// success:false,

// message:"Old password is incorrect"

// });

// }




// const salt =
// await bcrypt.genSalt(10);


// user.password =
// await bcrypt.hash(
//     newPassword,
//     salt
// );


// await user.save();



// return res.status(200).json({

// success:true,

// message:"Password changed successfully"

// });



// }catch(error){


// return res.status(500).json({

// success:false,

// message:error.message

// });


// }

// }


async logout(req, res) {

    const { refreshToken } = req.body || {};

    if (refreshToken) {
        await RefreshToken.deleteOne({
            token: refreshToken,
        });
    }

    res.clearCookie("token");
    res.clearCookie("refreshToken");

    return res.status(200).json({
        success: true,
        message: "Logout Successful",
    });

}

async forgotPassword(req,res){

try{

const { email } = req.body || {};


if(!email){

return res.status(400).json({

success:false,

message:"Email required"

});

}



const user = await User.findOne({

email:email.toLowerCase().trim()

});



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}



// create reset token

const resetToken = crypto.randomBytes(32).toString("hex");



user.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");


user.resetPasswordExpire = 
Date.now() + 15 * 60 * 1000;



await user.save();




// reset url

const resetUrl =

`${process.env.CLIENT_URL}/reset-password/${encodeURIComponent(resetToken)}`;





await sendResetPasswordEmail(

user,

resetUrl

);




return res.status(200).json({

success:true,

message:"Reset password link sent"

});




}catch(error){


return res.status(500).json({

success:false,

message:error.message

});

}

}


async resetPassword(req,res){

try{

const { token } = req.params;

const { password } = req.body || {};


if(!password){

return res.status(400).json({

success:false,

message:"Password required"

});

}


// find user by token

const user = await User.findOne({

 resetPasswordToken: crypto
   .createHash("sha256")
   .update(token)
   .digest("hex"),

 resetPasswordExpire:{
    $gt:Date.now()
 }

});


if(!user){

return res.status(400).json({

success:false,

message:"Token is invalid or expired"

});

}



// hash new password

const salt = await bcrypt.genSalt(10);


user.password = await bcrypt.hash(
    password,
    salt
);



// clear reset fields

user.resetPasswordToken = "";

user.resetPasswordExpire = undefined;



await user.save();

await RefreshToken.deleteMany({ userId: user._id });



return res.status(200).json({

success:true,

message:"Password reset successfully"

});



}catch(error){


return res.status(500).json({

success:false,

message:error.message

});


}

}
// async blockUser(req, res) {

//   try {

//     const user = await User.findById(req.params.id);

//     if (!user) {

//       return res.status(404).json({

//         success: false,

//         message: "User not found",

//       });

//     }

//     user.isBlocked = true;

//     await user.save();

//     logger.info(`User Blocked : ${user.email}`);

//     return res.status(200).json({

//       success: true,

//       message: "User blocked",

//     });

//   } catch (error) {

//     logger.error(error.message);

//     return res.status(500).json({

//       success: false,

//       message: error.message,

//     });

//   }

// }


// async unblockUser(req, res) {

//   try {

//     const user = await User.findById(req.params.id);

//     if (!user) {

//       return res.status(404).json({

//         success: false,

//         message: "User not found",

//       });

//     }

//     user.isBlocked = false;

//     await user.save();

//     logger.info(`User Unblocked : ${user.email}`);

//     return res.status(200).json({

//       success: true,

//       message: "User unblocked",

//     });

//   } catch (error) {

//     logger.error(error.message);

//     return res.status(500).json({

//       success: false,

//       message: error.message,

//     });

//   }

// }



}

module.exports = new AuthController();


















// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const sendEmail = require("../utils/sendEmail");
// const OTPModel = require("../models/otp");
// const cloudinary = require("../config/cloudinary");
// const fs = require("fs");


// class AuthController {
//   async register(req, res) {
//   try {
//     const { name, email, phone, password } = req.body;

//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const existUser = await User.findOne({ email });

//     if (existUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     let image = "";
//     let public_id = "";

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "argo_Sphere/users",
//       });

//       image = result.secure_url;
//       public_id = result.public_id;

//       // delete local image
//       fs.unlinkSync(req.file.path);
//     }

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password: hashPassword,
//       image,
//       public_id,
//     });

//     await sendEmail(req, user);

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully. OTP sent to your email.",
//       data: user,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }


// async updateProfile(req, res) {
//   try {

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Update text fields
//     user.name = req.body.name || user.name;
//     user.phone = req.body.phone || user.phone;

//     // New image uploaded?
//     if (req.file) {

//       // Delete old image from Cloudinary
//       if (user.public_id) {
//         await cloudinary.uploader.destroy(user.public_id);
//       }

//       // Upload new image
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "argo_Sphere/users",
//       });

//       user.image = result.secure_url;
//       user.public_id = result.public_id;

//       // Delete local file
//       fs.unlinkSync(req.file.path);
//     }

//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       data: user,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }


// async deleteUser(req, res) {
//   try {

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Delete image from Cloudinary
//     if (user.public_id) {
//       await cloudinary.uploader.destroy(user.public_id);
//     }

//     // Delete user from MongoDB
//     await User.findByIdAndDelete(req.params.id);

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }



//   async login(req,res){
//     try{
//       const {email,password}=req.body
//       if(!email || !password){
//         return res.status(400).json({
//           success: false,
//           message: "All fields are required",
//         });
//       }

//       const existingUser=await User.findOne({email})
//       if(!existingUser){
//        return res.status(400).json({
//         success: false,
//         message: "User not found",
//        })
//       }

//       const isMatch=await bcrypt.compare(password,existingUser.password)
//       if(!isMatch){
//         return res.status(400).json({
//           success: false,
//           message: "Invalid credentials",
//         });
//       }

//       if(!existingUser.isVarified){
//         return res.status(400).json({
//           success: false,
//           message: "User not varified",
//         });
//       }
      

//       const token= jwt.sign({
//         id:existingUser._id,
//         name:existingUser.name,
//         email:existingUser.email,
//         phone:existingUser.phone
//       },process.env.JWT_SECRECT,{expiresIn:"1d"})

//       return res.status(200).json({
//         success: true,
//         message: "User logged in successfully",
//         data: {
//           id: existingUser._id,
//           name: existingUser.name,
//           email: existingUser.email,
//           phone: existingUser.phone,
//         },
//          token: token,
//       });

//     }catch(error){
//        return res.status(500).json({
//         success: true,
//         message: error.message,
//       });
//     }
//   }

//   async verify(req,res){
//     try {
//             const { email, otp } = req.body;
//             // Check if all required fields are provided
//             if (!email || !otp) {
//                 return res.status(400).json({ status: false, message: "All fields are required" });
//             }
//             const existingUser = await User.findOne({ email });

//             // Check if email doesn't exists
//             if (!existingUser) {
//                 return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
//             }

//             // Check if email is already verified
//             if (existingUser.isVarified) {
//                 return res.status(400).json({ status: false, message: "Email is already verified" });
//             }
//             // Check if there is a matching email verification OTP
//             const emailVerification = await OTPModel.findOne({ userId: existingUser._id, otp });
//             if (!emailVerification) {
//                 if (!existingUser.isVarified) {
//                     // console.log(existingUser);
//                     await sendEmail(req, existingUser);
//                     return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
//                 }
//                 return res.status(400).json({ status: false, message: "Invalid OTP" });
//             }
//             // Check if OTP is expired
//             const currentTime = new Date();
//             // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
//             const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
//             if (currentTime > expirationTime) {
//                 // OTP expired, send new OTP
//                 await sendEmail(req, existingUser);
//                 return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
//             }
//             // OTP is valid and not expired, mark email as verified
//             existingUser.isVarified = true;
//             await existingUser.save();

//             // Delete email verification document
//             await OTPModel.deleteMany({ userId: existingUser._id });
//             return res.status(200).json({ status: true, message: "Email verified successfully" });


//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
//         }


//   }

//   async dashboard(req,res){
//     try{
//       return res.status(200).json({
//         success: true,
//         message: "welcome User dashboard",
//         dsat: req.user
//       });
//     }catch(error){
//        return res.status(500).json({
//         success: true,
//         message: error.message,
//       });
//     }
//   }
// }

// module.exports = new AuthController();

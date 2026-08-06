const transporter = require("../config/mail");
const OTPModel = require("../models/Otp");
const logger = require("./logger");


// =========================
// Send OTP Email
// =========================

const sendOTPEmail = async (user) => {
  try {

    // remove old otp
    await OTPModel.deleteMany({
      userId: user._id,
    });


    // create string OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();



    // save otp
    await OTPModel.create({

      userId:user._id,

      otp:otp,

    });



    // send mail
    await transporter.sendMail({

      from: process.env.EMAIL_FROM,

      to:user.email,

      subject:"Email Verification OTP",


      html:`
        <h2>Hello ${user.name}</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP expires in 15 minutes.</p>
      `

    });



    logger.info(`OTP sent ${user.email}`);


    return otp;



  } catch(error){

    logger.error(
      "OTP SEND ERROR " + error.message
    );

    throw error;

  }
};




// =========================
// Reset Password Email
// =========================


const sendResetPasswordEmail = async (
  user,
  resetUrl
)=>{

 try{


  await transporter.sendMail({


    from:process.env.EMAIL_FROM,


    to:user.email,


    subject:"Reset Password",


    html:`
    <h2>Hello ${user.name}</h2>

    <p>Reset your password</p>

    <a href="${resetUrl}">
      Reset Password
    </a>
    `

  });


  logger.info(
    `Reset email sent ${user.email}`
  );



 }catch(error){

    logger.error(error.message);

    throw error;

 }

};


module.exports = {
  sendOTPEmail,
  sendResetPasswordEmail
};
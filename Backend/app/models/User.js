const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema(
{

    name:{
        type:String,
        required:true
    },


    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },


    phone:{
        type:String,
        required:true
    },


    password:{
        type:String,
        required:true,
        select:false
    },


    image:{
        type:String,
        default:""
    },


    public_id:{
        type:String,
        default:""
    },


    role: { type: String,
         enum: [ "farmer", "ngo", "officer", "ministry", "admin" ], 
         default: "farmer" },


gender: { type: String,
    
    enum: [ "male", "female", "other" ] },


    address: { type: String, default: "" },
    
    district: { type: String, default: "" },
    
    state: { type: String, default: "" },

    



    // email verification
    isVerified:{
        type:Boolean,
        default:false
    },


    isBlocked:{
        type:Boolean,
        default:false
    },


    // forgot password

    resetPasswordToken:{
        type:String,
        default:""
    },


    resetPasswordExpire:{
        type:Date
    }

},

{
    timestamps:true,
    versionKey:false
}

);


// const UserModel = mongoose.model(
//     "user",
//     UserSchema
// );
// module.exports = UserModel;


module.exports =
mongoose.models.user ||
mongoose.model(
    "user",
    UserSchema
);


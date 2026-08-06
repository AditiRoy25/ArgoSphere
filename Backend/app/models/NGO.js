
const mongoose = require("mongoose");

const ngoSchema =
new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    organizationName:{
        type:String,
        required:true
    },

    registrationNumber:{
        type:String,
        required:true
    },

    ministryApproval:{
        type:Boolean,
        default:false
    },

    isBlocked:{
        type:Boolean,
        default:false
    },

    logo:{
        type:String
    },

    address:{
        type:String
    },
     description:{
        type:String
    },
     website:{
        type:String
    }
},
{
    timestamps:true
});

module.exports =
mongoose.model("NGO",ngoSchema);



// const ngoSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   organizationName: {
//     type: String,
//     required: true,
//   },

//   registrationNumber: {
//     type: String,
//     required: true,
//   },

//   ministryApproval: {
//     type: Boolean,
//     default: false,
//   },

//   logo: String,

//   coverImage: String,

//   description: String,

//   category: String,

//   state: String,

//   district: String,

//   phone: String,

//   email: String,

//   website: String,

//   address: String,

//   mission: String,

//   vision: String,

//   foundedYear: Number,

//   gallery: [
//     String
//   ],

//   focusAreas: [
//     String
//   ],

//   achievements: [
//     String
//   ],
// },
// {
//   timestamps: true,
// });

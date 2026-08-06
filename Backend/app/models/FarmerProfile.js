const mongoose = require("mongoose");

const farmerProfileSchema =
new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    farmSize:Number,

    soilType:String,

    irrigationSource:String,

    location:{
        lat:Number,
        lng:Number
    }

},{timestamps:true});

module.exports=
mongoose.model(
"FarmerProfile",
farmerProfileSchema
);
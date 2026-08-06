const mongoose =
require("mongoose");

const schemeApplicationSchema =
new mongoose.Schema({

    farmer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    scheme:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GovernmentScheme",
        required:true
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Approved",
            "Rejected"
        ],
        default:"Pending"
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
"SchemeApplication",
schemeApplicationSchema
);
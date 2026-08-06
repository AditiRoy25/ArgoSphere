
const mongoose = require("mongoose");

const farmMapSchema =
new mongoose.Schema(
{
    farm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Farm",
        required:true
    },

    coordinates:[
        {
            lat:Number,
            lng:Number
        }
    ],

    boundaryArea:{
        type:Number
    }
},
{
    timestamps:true
});

module.exports =
mongoose.model(
"FarmMap",
farmMapSchema
);

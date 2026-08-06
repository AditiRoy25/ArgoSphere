
const mongoose = require("mongoose");

const workshopSchema =
new mongoose.Schema(
{
    ngo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"NGO",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:String,

    date:Date,

    location:String,

    attendees:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},
{
    timestamps:true
});

module.exports =
mongoose.model(
"Workshop",
workshopSchema
);


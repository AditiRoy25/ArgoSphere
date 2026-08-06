
const mongoose = require("mongoose");

const cropCalendarSchema =
new mongoose.Schema(
{
    farmer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    farm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Farm",
        required:true
    },

    cropName:{
        type:String,
        required:true
    },

    sowingDate:Date,

    fertilizerDate:Date,

    irrigationDate:Date,

    harvestDate:Date,

    notes:String
},
{
    timestamps:true
});

module.exports =
mongoose.model(
"CropCalendar",
cropCalendarSchema
);


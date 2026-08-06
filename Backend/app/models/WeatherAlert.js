
const mongoose = require("mongoose");

const weatherAlertSchema =
new mongoose.Schema(
{
    district:{
        type:String,
        required:true
    },

    alertType:{
        type:String,
        enum:[
            "rain",
            "storm",
            "heatwave",
            "coldwave",
            "flood"
        ]
    },

    severity:{
        type:String,
        enum:[
            "low",
            "medium",
            "high"
        ]
    },

    message:String,

    startTime:Date,

    endTime:Date
},
{
    timestamps:true
});

module.exports =
mongoose.model(
"WeatherAlert",
weatherAlertSchema
);


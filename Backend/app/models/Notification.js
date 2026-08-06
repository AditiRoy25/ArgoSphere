
const mongoose =
require("mongoose");

const Schema =
mongoose.Schema;

const NotificationSchema =
new Schema(

    {

        user:{

            type:
            mongoose.Schema.Types.ObjectId,

            ref:"user",

            required:true

        },

        title:{

            type:String,

            required:true

        },

        message:{

            type:String,

            required:true

        },

        type:{

            type:String,

            enum:[

                "weather",
                "crop",
                "allowance",
                "order",
                "announcement"

            ]

        },

        isRead:{

            type:Boolean,

            default:false

        }

    },

    {

        timestamps:true,

        versionKey:false

    }

);

module.exports =
mongoose.models.Notification ||

mongoose.model(
    "Notification",
    NotificationSchema
);


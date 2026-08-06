
const mongoose = require("mongoose");

const aiConversationSchema =
new mongoose.Schema(
{
    farmer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        default:"New Conversation"
    },

    lastMessage:String
},
{
    timestamps:true
});

module.exports =
mongoose.model(
"AIConversation",
aiConversationSchema
);


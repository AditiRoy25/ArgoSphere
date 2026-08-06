const mongoose =
require("mongoose");

const aboutSchema =
new mongoose.Schema({

title:{
type:String,
required:true
},

description:{
type:String,
required:true
},

bannerImage:{
type:String
},

mission:{
type:String
},

vision:{
type:String
},

ministryName:{
type:String
},

ministryLogo:{
type:String
}

},
{
timestamps:true
}
);

module.exports =
mongoose.model(
"AboutPage",
aboutSchema
);
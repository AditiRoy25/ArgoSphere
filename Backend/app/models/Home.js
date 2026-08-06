const mongoose = require("mongoose");

const homePageSchema =
new mongoose.Schema(
{
  heroTitle:{
    type:String,
    required:true
  },

  heroSubtitle:{
    type:String,
    required:true
  },

  heroImage:{
    type:String
  },

  weatherWidget:{
    temperature:String,
    location:String,
    condition:String
  },

  cropReminder:{
    type:String
  },

  stats:[
    {
      title:String,
      count:Number
    }
  ],

  supportText:{
    type:String
  }

},
{
  timestamps:true
}
);

module.exports =
mongoose.model(
"HomePage",
homePageSchema
);
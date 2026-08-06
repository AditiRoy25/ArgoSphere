const AboutPage =
require("../models/About");

class AboutController {

async getAboutPage(
req,
res
){

try {

const about =
await AboutPage.findOne();

return res.status(200).json({
success:true,
data:about
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

}

async updateAboutPage(
req,
res
){

try {

const about =
await AboutPage.findOneAndUpdate(
{},
req.body,
{
new:true,
upsert:true
}
);

return res.status(200).json({
success:true,
message:"About page updated",
data:about
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

}

}

module.exports =
new AboutController();
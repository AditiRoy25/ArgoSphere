const HomePage =
require("../models/Home");

class HomeController {

async getHomePage(
req,
res
){

try {

const home =
await HomePage.findOne();

return res.status(200).json({
success:true,
data:home
});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

}

async updateHomePage(
req,
res
){

try {

const home =
await HomePage.findOneAndUpdate(
{},
req.body,
{
new:true,
upsert:true
}
);

return res.status(200).json({
success:true,
message:"Home page updated",
data:home
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
new HomeController();
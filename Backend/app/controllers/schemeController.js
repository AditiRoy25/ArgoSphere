const GovernmentScheme =
require("../models/GovernmentScheme");

const SchemeApplication =
require("../models/SchemeApplication");

class SchemeController{

    // ======================
    // Get All Schemes
    // ======================
async createScheme(req, res) {
  try {
    const scheme = await GovernmentScheme.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Government scheme created successfully.",
      scheme,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}




async getSchemes(req, res) {

    try {

        const {
            search = "",
            category,
            state,
            eligibility,
            page = 1,
            limit = 6,
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const filter = {
            status: "Active",
        };

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i",
            };
        }

        if (category) {
            filter.category = category;
        }

        if (state) {
            filter.state = state;
        }

        if (eligibility) {
            filter.eligibility = {
                $regex: eligibility,
                $options: "i",
            };
        }

        const total =
            await GovernmentScheme.countDocuments(filter);

        const schemes =
            await GovernmentScheme.find(filter)
                .sort({
                    createdAt: -1,
                })
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber);

        return res.json({

            success: true,

            message:
                "Government schemes fetched successfully.",

            schemes,

            pagination: {

                total,

                page: pageNumber,

                limit: limitNumber,

                totalPages: Math.ceil(
                    total / limitNumber
                ),
            },
        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

}
    // ======================

    async getScheme(req,res){

        try{

            const scheme =
            await GovernmentScheme.findById(
                req.params.id
            );

            if(!scheme){

                return res.status(404).json({

                    success:false,
                    message:"Scheme not found."

                });

            }

            return res.json({

                success:true,
                message:"Government scheme fetched successfully.",

                scheme

            });

        }

        catch(error){

            return res.status(500).json({

                success:false,
                message:error.message

            });

        }

    }

    // ======================

    async applyScheme(req,res){

        try{

            const {schemeId}=req.body;

            const exists =
            await SchemeApplication.findOne({

                farmer:req.user.id,

                scheme:schemeId

            });

            if(exists){

                return res.status(400).json({

                    success:false,

                    message:"You already applied."

                });

            }

            const application =
            await SchemeApplication.create({

                farmer:req.user.id,

                scheme:schemeId

            });

            await application.populate(
                "scheme"
            );

            return res.status(201).json({

                success:true,

                message:"Scheme application submitted successfully.",

                application

            });

        }

        catch(error){

            return res.status(500).json({

                success:false,

                message:error.message

            });

        }

    }

    // ======================

    async mySchemes(req,res){

        try{

            const applications =
            await SchemeApplication.find({

                farmer:req.user.id

            })

            .populate("scheme")

            .sort({
                createdAt:-1
            });

            return res.json({

                success:true,

                message:"Applied schemes fetched successfully.",

                applications

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
new SchemeController();
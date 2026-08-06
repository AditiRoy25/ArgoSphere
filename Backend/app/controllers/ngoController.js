
const mongoose =
require("mongoose");

const NGO =
require("../models/NGO");

const Workshop =
require("../models/Workshop");

const User =
require("../models/User");

class NGOController {

    // =========================
    // REGISTER NGO
    // =========================

    async registerNGO(
        req,
        res
    ) {

        try {

            const ngo =
            await NGO.create({

                ...req.body,

                ...(req.file && {
                    logo: `/uploads/users/${req.file.filename}`
                }),

                user:
                req.user._id

            });

            return res.status(201)
            .json({
                success:true,
                data: ngo
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // =========================
    // GET ALL NGOs
    // =========================

    // async getNGOs(
    //     req,
    //     res
    // ) {

    //     try {

    //         const ngos =
    //         await NGO.aggregate([

    //             {
    //                 $lookup:{
    //                     from:"users",

    //                     localField:"user",

    //                     foreignField:"_id",

    //                     as:"user"
    //                 }
    //             },

    //             {
    //                 $unwind:"$user"
    //             },

    //             {
    //                 $sort:{
    //                     createdAt:-1
    //                 }
    //             }

    //         ]);

    //         return res.status(200)
    //         .json({
    //             success:true,
    //             data: ngos,
    //             pagination: {
    //                 page: 1,
    //                 limit: ngos.length,
    //                 total: ngos.length,
    //                 totalPages: 1
    //             }
    //         });

    //     } catch (error) {

    //         return res.status(500)
    //         .json({
    //             success:false,
    //             message:error.message
    //         });

    //     }

    // }
async getNGOs(req, res) {
  try {

    // ============================
    // QUERY
    // ============================

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const search =
      req.query.search?.trim() || "";

    const skip =
      (page - 1) * limit;


    // ============================
    // MATCH
    // ============================

    const match = {};

    if (search) {

      match.$or = [

        {
          organizationName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          registrationNumber: {
            $regex: search,
            $options: "i",
          },
        },

        {
          address: {
            $regex: search,
            $options: "i",
          },
        },

      ];
    }


    // ============================
    // GET NGOs
    // ============================

    const ngos =
      await NGO.aggregate([

        // NGO FILTER
        {
          $match: match,
        },


        // ========================
        // USER LOOKUP
        // ========================

        {
          $lookup: {

            from: "users",

            localField: "user",

            foreignField: "_id",

            as: "user",
          },
        },


        // ========================
        // USER ARRAY -> OBJECT
        // ========================

        {
          $unwind: {

            path: "$user",

            preserveNullAndEmptyArrays:
              true,
          },
        },


        // ========================
        // REMOVE PRIVATE DATA
        // ========================

        {
          $project: {

            "user.password": 0,

            "user.resetPasswordToken":
              0,

            "user.resetPasswordExpire":
              0,
          },
        },


        // ========================
        // NEWEST FIRST
        // ========================

        {
          $sort: {
            createdAt: -1,
          },
        },


        // ========================
        // PAGINATION
        // ========================

        {
          $skip: skip,
        },

        {
          $limit: limit,
        },

      ]);


    // ============================
    // TOTAL
    // ============================

    const total =
      await NGO.countDocuments(
        match
      );


    // ============================
    // RESPONSE
    // ============================

    return res
      .status(200)
      .json({

        success: true,

        message:
          "NGOs retrieved successfully",

        data: ngos,

        total,

        page,

        limit,

        totalPages:
          Math.ceil(
            total / limit
          ),
      });


  } catch (error) {

    console.error(
      "GET NGOS ERROR:",
      error
    );

    return res
      .status(500)
      .json({

        success: false,

        message:
          error.message,
      });
  }
}



async getMyNGO(req, res) {
  try {

    // ============================
    // LOGGED-IN USER
    // ============================

    const userId =
      req.user?._id ||
      req.user?.id;


    console.log(
      "LOGGED USER:",
      req.user
    );

    console.log(
      "USER ID:",
      userId
    );


    // ============================
    // CHECK USER ID
    // ============================

    if (!userId) {

      return res
        .status(401)
        .json({

          success: false,

          message:
            "Unauthorized",
        });
    }


    // ============================
    // VALID OBJECT ID
    // ============================

    if (
      !mongoose.Types.ObjectId
        .isValid(userId)
    ) {

      return res
        .status(400)
        .json({

          success: false,

          message:
            "Invalid User ID",
        });
    }


    // ============================
    // GET NGO
    // ============================

    const ngo =
      await NGO.aggregate([

        // Find NGO belonging
        // to logged-in user

        {
          $match: {

            user:
              new mongoose.Types.ObjectId(
                userId
              ),
          },
        },


        // ========================
        // USER LOOKUP
        // ========================

        {
          $lookup: {

            from: "users",

            localField: "user",

            foreignField: "_id",

            as: "user",
          },
        },


        // ========================
        // ARRAY -> OBJECT
        // ========================

        {
          $unwind: {

            path: "$user",

            preserveNullAndEmptyArrays:
              true,
          },
        },


        // ========================
        // REMOVE PRIVATE DATA
        // ========================

        {
          $project: {

            "user.password": 0,

            "user.resetPasswordToken":
              0,

            "user.resetPasswordExpire":
              0,
          },
        },

      ]);


    // ============================
    // NOT FOUND
    // ============================

    if (!ngo.length) {

      return res
        .status(404)
        .json({

          success: false,

          message:
            "NGO profile not found",
        });
    }


    // ============================
    // RESPONSE
    // ============================

    return res
      .status(200)
      .json({

        success: true,

        message:
          "NGO profile retrieved successfully",

        data: ngo[0],
      });


  } catch (error) {

    console.error(
      "GET MY NGO ERROR:",
      error
    );

    return res
      .status(500)
      .json({

        success: false,

        message:
          error.message,
      });
  }
}
async getMyStatistics(req, res) {

    try {

        const ngo =
            await NGO.findOne({
                user: req.user.id
            });

        if (!ngo) {

            return res
                .status(404)
                .json({
                    success: false,
                    message:
                        "NGO profile not found"
                });
        }

        const statistics = {

            totalWorkshops: 0,

            totalBeneficiaries: 0,

            totalReports: 0,

            totalDonations: 0,
        };

        return res
            .status(200)
            .json({

                success: true,

                message:
                    "NGO statistics retrieved successfully",

                data: statistics
            });

    } catch (error) {

        return res
            .status(500)
            .json({
                success: false,
                message:
                    error.message
            });
    }
}





    // =========================
    // GET SINGLE NGO
    // =========================

   async getNGO(req, res) {
  try {

    // =========================
    // GET ID
    // =========================

    const { id } = req.params;

    console.log(
      "GET NGO ID:",
      id
    );


    // =========================
    // VALIDATE ID
    // =========================

    if (
      !id ||
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid NGO ID",
        });
    }


    // =========================
    // GET NGO
    // =========================

    const ngo =
      await NGO.aggregate([

        {
          $match: {
            _id:
              new mongoose.Types.ObjectId(
                id
              ),
          },
        },


        // =====================
        // USER
        // =====================

        {
          $lookup: {
            from: "users",

            localField: "user",

            foreignField: "_id",

            as: "user",
          },
        },


        {
          $unwind: {
            path: "$user",

            preserveNullAndEmptyArrays:
              true,
          },
        },


        // =====================
        // REMOVE PASSWORD
        // =====================

        {
          $project: {
            "user.password": 0,

            "user.resetPasswordToken":
              0,

            "user.resetPasswordExpire":
              0,
          },
        },

      ]);


    // =========================
    // NOT FOUND
    // =========================

    if (!ngo.length) {

      return res
        .status(404)
        .json({
          success: false,

          message:
            "NGO Not Found",
        });
    }


    // =========================
    // SUCCESS
    // =========================

    return res
      .status(200)
      .json({
        success: true,

        message:
          "NGO Retrieved Successfully",

        // Use data because your
        // frontend SingleResponse uses data
        data: ngo[0],
      });


  } catch (error) {

    console.error(
      "GET NGO ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,

        message:
          error.message,
      });
  }
}

    // =========================
    // UPDATE NGO
    // =========================

    async updateNGO(
        req,
        res
    ) {

        try {

            const ngo =
            await NGO
            .findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new:true
                }

            );

            return res.status(200)
            .json({
                success:true,
                ngo
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // =========================
    // DELETE NGO
    // =========================

    async deleteNGO(
        req,
        res
    ) {

        try {

            await NGO
            .findByIdAndDelete(
                req.params.id
            );

            return res.status(200)
            .json({
                success:true,
                message:
                "NGO Deleted"
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // =========================
    // APPROVE NGO
    // =========================

    async approveNGO(
        req,
        res
    ) {

        try {

            const ngo =
            await NGO
            .findByIdAndUpdate(

                req.params.id,

                {
                    ministryApproval:
                    true
                },

                {
                    new:true
                }

            );

            return res.status(200)
            .json({
                success:true,
                ngo
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // =========================
    // NGO WORKSHOPS
    // =========================

    async getNGOWorkshops(
        req,
        res
    ) {

        try {

            const ngoId =
            new mongoose
            .Types
            .ObjectId(
                req.params.id
            );

            const workshops =
            await Workshop.aggregate([

                {
                    $match:{
                        ngo:ngoId
                    }
                },

                {
                    $sort:{
                        date:-1
                    }
                }

            ]);

            return res.status(200)
            .json({
                success:true,
                workshops
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // =========================
    // NGO ANALYTICS
    // =========================

    async ngoAnalytics(
        req,
        res
    ) {

        try {

            const analytics =
            await NGO.aggregate([

                {
                    $lookup:{

                        from:
                        "workshops",

                        localField:
                        "_id",

                        foreignField:
                        "ngo",

                        as:
                        "workshops"
                    }
                },

                {
                    $project:{

                        organizationName:1,

                        totalWorkshops:{
                            $size:
                            "$workshops"
                        }

                    }
                }

            ]);

            return res.status(200)
            .json({
                success:true,
                analytics
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }

    // =========================
    // NGO PERFORMANCE REPORT
    // =========================

    async ngoPerformanceReport(
        req,
        res
    ) {

        try {

            const report =
            await Workshop.aggregate([

                {
                    $group:{

                        _id:"$ngo",

                        totalWorkshops:{
                            $sum:1
                        },

                        totalAttendance:{
                            $sum:{
                                $size:
                                "$attendees"
                            }
                        }

                    }
                },

                {
                    $lookup:{

                        from:"ngos",

                        localField:"_id",

                        foreignField:"_id",

                        as:"ngo"
                    }
                },

                {
                    $unwind:"$ngo"
                }

            ]);

            return res.status(200)
            .json({
                success:true,
                report
            });

        } catch (error) {

            return res.status(500)
            .json({
                success:false,
                message:error.message
            });

        }

    }







}

module.exports =
new NGOController();


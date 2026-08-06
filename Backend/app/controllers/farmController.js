
const mongoose = require("mongoose");

const Farm = require("../models/Farm");

class FarmController {




    // Farmer Own Farms
async getMyFarms(req, res) {
  try {
    const farmerId =
      req.user.id || req.user._id;

    const farms = await Farm.find({
      farmer: farmerId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      total: farms.length,
      farms,
    });
  } catch (error) {
    console.error(
      "GET MY FARMS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
    // Create Farm
   async createFarm(req, res) {
  try {
    const farmerId =
      req.user.id ||
      req.user._id;

    const farm =
      await Farm.create({
        ...req.body,
        farmer: farmerId,
      });

    return res.status(201).json({
      success: true,
      message:
        "Farm created successfully.",
      farm,
    });
  } catch (error) {
    console.error(
      "CREATE FARM ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

    // Get All Farms
    async getFarms(req, res) {

        try {

            const farms =
                await Farm.aggregate([

                    {
                        $lookup: {
                            from: "users",
                            localField: "farmer",
                            foreignField: "_id",
                            as: "farmer"
                        }
                    },

                    {
                        $unwind: "$farmer"
                    },

                    {
                        $project: {

                            farmName: 1,
                            farmArea: 1,
                            soilType: 1,
                            irrigationType: 1,

                            farmerName:
                                "$farmer.name",

                            farmerEmail:
                                "$farmer.email"
                        }
                    }

                ]);

            return res.status(200).json({
                success: true,
                total: farms.length,
                farms
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // Single Farm
    async getFarm(req, res) {

        try {

            const farm =
                await Farm.aggregate([

                    {
                        $match: {
                            _id:
                                new mongoose.Types.ObjectId(
                                    req.params.id
                                )
                        }
                    },

                    {
                        $lookup: {
                            from: "users",
                            localField: "farmer",
                            foreignField: "_id",
                            as: "farmer"
                        }
                    },

                    {
                        $unwind: "$farmer"
                    }

                ]);

            if (!farm.length) {

                return res.status(404)
                    .json({
                        success: false,
                        message: "Farm Not Found"
                    });

            }

            return res.status(200).json({
                success: true,
                farm: farm[0]
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // Farmer Own Farms
    // async getMyFarms(req, res) {

    //     try {

    //         const farms =
    //             await Farm.aggregate([

    //                 {
    //                     $match: {
    //                         farmer:
    //                             new mongoose.Types.ObjectId(
    //                                 req.user._id
    //                             )
    //                     }
    //                 }

    //             ]);

    //         return res.status(200).json({
    //             success: true,
    //             farms
    //         });

    //     } catch (error) {

    //         return res.status(500).json({
    //             success: false,
    //             message: error.message
    //         });

    //     }

    // }

    // Update Farm
    async updateFarm(req, res) {

        try {

            const farm =
                await Farm.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            return res.status(200).json({
                success: true,
                farm
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // Delete Farm
    async deleteFarm(req, res) {

        try {

            await Farm.findByIdAndDelete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Farm Deleted"
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // Farm Statistics
   async farmStatistics(req, res) {
  try {
    const stats = await Farm.aggregate([
      {
        $group: {
          _id: null,

          totalFarms: {
            $sum: 1,
          },

          totalArea: {
            $sum: "$area",
          },

          avgArea: {
            $avg: "$area",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,

      stats: stats[0] || {
        totalFarms: 0,
        totalArea: 0,
        avgArea: 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
    // Soil Type Report
    async soilReport(req, res) {

        try {

            const report =
                await Farm.aggregate([

                    {
                        $group: {

                            _id: "$soilType",

                            totalFarms: {
                                $sum: 1
                            }

                        }
                    },

                    {
                        $sort: {
                            totalFarms: -1
                        }
                    }

                ]);

            return res.status(200).json({
                success: true,
                report
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports =
new FarmController();


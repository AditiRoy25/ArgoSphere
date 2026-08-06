const CropCalendar =
require("../models/CropCalender");

const Farm =
require("../models/Farm");

class CropCalendarController {

    // =====================================
    // CREATE CROP SCHEDULE
    // =====================================

    async createCrop(req, res) {

        try {

            const {

                farm,

                cropName,

                sowingDate,

                fertilizerDate,

                irrigationDate,

                harvestDate,

                notes

            } = req.body;

            // Check farm belongs to farmer

            const farmExists =
            await Farm.findOne({

                _id: farm,

                farmer: req.user._id

            });

            if (!farmExists) {

                return res.status(404).json({

                    success: false,

                    message: "Farm not found."

                });

            }

            const crop =
            await CropCalendar.create({

                farmer: req.user._id,

                farm,

                cropName,

                sowingDate,

                fertilizerDate,

                irrigationDate,

                harvestDate,

                notes

            });

            return res.status(201).json({

                success: true,

                message: "Crop schedule created successfully.",

                crop

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // =====================================
    // MY CROP CALENDAR
    // =====================================

    async myCrops(req, res) {

        try {

            const crops =
            await CropCalendar.find({

                farmer: req.user._id

            })

            .populate(

                "farm",

                "farmName area soilType"

            )

            .sort({

                sowingDate: 1

            });

            return res.json({

                success: true,

                crops

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // =====================================
    // SINGLE CROP
    // =====================================

    async getCrop(req, res) {

        try {

            const crop =
            await CropCalendar.findOne({

                _id: req.params.id,

                farmer: req.user._id

            }).populate("farm");

            if (!crop) {

                return res.status(404).json({

                    success: false,

                    message: "Crop not found."

                });

            }

            return res.json({

                success: true,

                crop

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // =====================================
    // UPDATE
    // =====================================

    async updateCrop(req, res) {

        try {

            const crop =
            await CropCalendar.findOneAndUpdate(

                {

                    _id: req.params.id,

                    farmer: req.user._id

                },

                req.body,

                {

                    new: true

                }

            );

            if (!crop) {

                return res.status(404).json({

                    success: false,

                    message: "Crop not found."

                });

            }

            return res.json({

                success: true,

                message: "Crop updated successfully.",

                crop

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // =====================================
    // DELETE
    // =====================================

    async deleteCrop(req, res) {

        try {

            const crop =
            await CropCalendar.findOneAndDelete({

                _id: req.params.id,

                farmer: req.user._id

            });

            if (!crop) {

                return res.status(404).json({

                    success: false,

                    message: "Crop not found."

                });

            }

            return res.json({

                success: true,

                message: "Crop deleted successfully."

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // =====================================
    // UPCOMING ACTIVITIES
    // =====================================

    async upcomingActivities(req, res) {

        try {

            const today =
            new Date();

            const crops =
            await CropCalendar.find({

                farmer: req.user._id,

                harvestDate: {

                    $gte: today

                }

            })

            .populate(

                "farm",

                "farmName"

            )

            .sort({

                harvestDate: 1

            })

            .limit(5);

            return res.json({

                success: true,

                crops

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports =
new CropCalendarController();
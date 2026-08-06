const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/cropCalendarController");

const auth =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const 
    validate =
require("../middlewares/validationMiddleware");

const {
    createCropValidation,
    updateCropValidation
} =
require("../validators/cropCalenderValidation");

// ==========================================
// CREATE CROP SCHEDULE
// ==========================================

router.post(

    "/",

    auth,

    authorize("farmer"),

    validate(
        createCropValidation
    ),

    controller.createCrop

);

// ==========================================
// MY CROP CALENDAR
// ==========================================

router.get(

    "/my",

    auth,

    authorize("farmer"),

    controller.myCrops

);

// ==========================================
// UPCOMING ACTIVITIES
// ==========================================

router.get(

    "/upcoming",

    auth,

    authorize("farmer"),

    controller.upcomingActivities

);

// ==========================================
// SINGLE CROP
// ==========================================

router.get(

    "/:id",

    auth,

    authorize("farmer"),

    controller.getCrop

);

// ==========================================
// UPDATE CROP
// ==========================================

router.put(

    "/:id",

    auth,

    authorize("farmer"),

    validate(
        updateCropValidation
    ),

    controller.updateCrop

);

// ==========================================
// DELETE CROP
// ==========================================

router.delete(

    "/:id",

    auth,

    authorize("farmer"),

    controller.deleteCrop

);

module.exports =
router;
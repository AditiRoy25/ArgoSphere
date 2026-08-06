
const express =
require("express");

const router =
express.Router();

const controller =
require(
"../controllers/userController"
);

const auth =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const validate =
require(
"../middlewares/validationMiddleware"
);

const {
    updateProfileValidation,
    changePasswordValidation
} = require(
"../validators/userValidation"
);

// =====================
// MY PROFILE
// =====================

router.get(
    "/me",
    auth,
    controller.myProfile
);

// =====================
// UPDATE PROFILE
// =====================

router.put(
    "/update-profile",
    auth,
    validate(
        updateProfileValidation
    ),
    controller.updateProfile
);

// =====================
// CHANGE PASSWORD
// =====================

router.put(
    "/change-password",
    auth,
    validate(
        changePasswordValidation
    ),
    controller.changePassword
);

// =====================
// FARMERS
// =====================

router.get(
    "/farmers",
    auth,
    authorize(
        "admin",
        "officer",
        "ngo",
        "ministry"
    ),
    controller.getFarmers
);

router.get(
    "/farmers/:id",
    auth,
    authorize(
        "admin",
        "officer",
        "ngo",
        "ministry"
    ),
    controller.getFarmer
);

module.exports =
router;


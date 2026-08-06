
const express =
require("express");

const router =
express.Router();

const controller =
require(
"../controllers/weatherController"
);

const auth =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const 
    validate
 = require(
"../middlewares/validationMiddleware"
);

const {
    createWeatherAlertValidation
} = require(
"../validators/weatherValidation"
);

// Create Alert

router.post(
    "/",
    auth,
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    validate(
        createWeatherAlertValidation
    ),
    controller.createAlert
);

// Reports

router.get(
    "/alert-type-report",
    auth,
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.alertTypeReport
);

router.get(
    "/district-report",
    auth,
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.districtReport
);

router.get(
    "/severity-report",
    auth,
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.severityReport
);

// District Alerts

router.get(
    "/district/:district",
    auth,
    controller.districtAlerts
);

// CRUD

router.get(
    "/",
    auth,
    controller.getAlerts
);

router.get(
    "/:id",
    auth,
    controller.getAlert
);

router.put(
    "/:id",
    auth,
    authorize(
        "admin",
        "officer",
        "ministry"
    ),
    controller.updateAlert
);

router.delete(
    "/:id",
    auth,
    authorize(
        "admin",
        "ministry"
    ),
    controller.deleteAlert
);

module.exports =
router;


const express =
require("express");

const router =
express.Router();

const farmController =
require(
"../controllers/farmController"
);

const auth =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const {
    validate
} = require(
"../middlewares/validationMiddleware"
);

const {
    createFarmValidation
} = require(
"../validators/farmValidation"
);


router.post(
  "/",
  auth,
  authorize("farmer"),
  farmController.createFarm
);

// All Farms
router.get(
  "/",
  auth,
  authorize(
    "admin",
    "officer",
    "ministry"
  ),
  farmController.getFarms
);

// Statistics
router.get(
  "/statistics",
  auth,
  authorize(
    "admin",
    "officer",
    "ministry"
  ),
  farmController.farmStatistics
);

// Soil Report
router.get(
  "/soil-report",
  auth,
  authorize(
    "admin",
    "officer",
    "ministry"
  ),
  farmController.soilReport
);


router.get(
  "/my-farms",
  auth,
  authorize("farmer"),
  farmController.getMyFarms
);
// ==========================================
// SINGLE FARM
// Keep dynamic /:id after specific routes
// ==========================================

router.get(
  "/:id",
  auth,
  farmController.getFarm
);

// Update
router.put(
  "/:id",
  auth,
  authorize("farmer"),
  farmController.updateFarm
);

// Delete
router.delete(
  "/:id",
  auth,
  authorize("farmer"),
  farmController.deleteFarm
);
module.exports =
router;
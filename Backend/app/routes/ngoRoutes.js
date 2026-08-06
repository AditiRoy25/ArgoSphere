const express = require("express");

const router = express.Router();

const controller =
  require("../controllers/ngoController");

const auth =
  require("../middlewares/authMiddleware");

const authorize =
  require("../middlewares/roleMiddleware");

const validate =
  require("../middlewares/validationMiddleware");

const upload =
  require("../middlewares/uploadMiddleware");

const {
  createNGOValidation,
} = require("../validators/ngoValidation");


// =====================================
// FIXED ROUTES FIRST
// =====================================

// Logged-in NGO profile
router.get(
  "/me/profile",
  auth,
  authorize("ngo"),
  controller.getMyNGO
);

// Logged-in NGO statistics
router.get(
  "/me/statistics",
  auth,
  authorize("ngo"),
  controller.getMyStatistics
);

// Analytics
router.get(
  "/analytics",
  auth,
  authorize(
    "admin",
    "ministry",
    "officer"
  ),
  controller.ngoAnalytics
);

// Performance
router.get(
  "/performance-report",
  auth,
  authorize(
    "admin",
    "ministry",
    "officer"
  ),
  controller.ngoPerformanceReport
);

// Approve
router.put(
  "/approve/:id",
  auth,
  authorize(
    "admin",
    "ministry"
  ),
  controller.approveNGO
);


// =====================================
// ROOT
// =====================================

router.get(
  "/",
  controller.getNGOs
);

router.post(
  "/",
  auth,
  authorize("ngo"),
  upload.single("logo"),
  validate(
    createNGOValidation
  ),
  controller.registerNGO
);


// =====================================
// DYNAMIC ROUTES LAST
// =====================================

router.get(
  "/:id/workshops",
  controller.getNGOWorkshops
);

router.get(
  "/:id",
  controller.getNGO
);

router.put(
  "/:id",
  auth,
  authorize(
    "ngo",
    "admin"
  ),
  controller.updateNGO
);

router.delete(
  "/:id",
  auth,
  authorize("admin"),
  controller.deleteNGO
);


module.exports = router;

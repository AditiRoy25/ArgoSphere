const express = require("express");

const router = express.Router();

const controller = require("../controllers/schemeController");

const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validationMiddleware");

const {
  applySchemeValidation,
} = require("../validators/schemeValidation");

// ==========================
// PUBLIC
// ==========================

router.get(
  "/",
  controller.getSchemes
);

// ==========================
// FARMER
// ==========================

router.post(
  "/apply",
  auth,
  authorize("farmer"),
  validate(applySchemeValidation),
  controller.applyScheme
);

router.get(
  "/my",
  auth,
  authorize("farmer"),
  controller.mySchemes
);

// ==========================
// ADMIN
// ==========================

router.post(
  "/",
  auth,
  authorize("admin"),
  controller.createScheme
);

// ==========================
// GET SINGLE SCHEME
// KEEP THIS LAST
// ==========================

router.get(
  "/:id",
  controller.getScheme
);

module.exports = router;
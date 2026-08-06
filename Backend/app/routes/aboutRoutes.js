const express =
require("express");

const router =
express.Router();

const controller =
require(
"../controllers/aboutController"
);

router.get(
"/",
controller.getAboutPage
);

router.put(
"/update",
controller.updateAboutPage
);

module.exports =
router;
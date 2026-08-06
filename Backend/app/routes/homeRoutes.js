const express =
require("express");

const router =
express.Router();

const controller =
require(
"../controllers/homeController"
);

router.get(
"/",
controller.getHomePage
);

router.put(
"/update",
controller.updateHomePage
);

module.exports =
router;
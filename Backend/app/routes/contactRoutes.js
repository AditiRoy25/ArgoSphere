const express = require("express");

const router = express.Router();

const controller = require("../controllers/contactController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validationMiddleware");

const {
  contactValidation,
  contactInfoValidation,
} = require("../validators/contactValidation");

// Public
router.post(
  "/message",
  validate(contactValidation),
  controller.sendMessage
);

router.get(
  "/info",
  controller.getContactInfo
);

// Admin
router.get(
  "/messages",
  auth,
  role("ADMIN"),
  controller.getMessages
);

router.patch(
  "/messages/:id",
  auth,
  role("ADMIN"),
  controller.updateMessageStatus
);

router.delete(
  "/messages/:id",
  auth,
  role("ADMIN"),
  controller.deleteMessage
);

router.put(
  "/info",
  auth,
  role("ADMIN"),
  validate(contactInfoValidation),
  controller.updateContactInfo
);

module.exports = router;
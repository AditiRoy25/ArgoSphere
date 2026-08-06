
const express =
require("express");

const router =
express.Router();

const controller =
require(
"../controllers/adminController"
);

const auth =
require("../middlewares/authMiddleware");

const authorize =
require("../middlewares/roleMiddleware");

const 
    validate = require(
"../middlewares/validationMiddleware"
);

const {
    updateUserRoleValidation
} = require(
"../validators/adminValidation"
);

const UserImage = require("../middlewares/uploadMiddleware");



// Dashboard

router.get(
    "/dashboard",
    auth,
    authorize("admin"),
    controller.dashboard
);

// Analytics

router.get(
    "/analytics",
    auth,
    authorize("admin"),
    controller.systemAnalytics
);

router.post(
  "/users",
  auth,
  authorize("admin"),
  UserImage.single("image"),
  controller.createUser
);

// Users

router.get(
    "/users",
    auth,
    authorize("admin"),
    controller.getUsers
);

router.get(
    "/users/:id",
    auth,
    authorize("admin"),
    controller.getUser
);

// Update Role

router.put(
    "/users/:id/role",
    auth,
    authorize("admin"),
    validate(
        updateUserRoleValidation
    ),
    controller.updateUserRole
);

// Block User

router.put(
    "/users/:id/block",
    auth,
    authorize("admin"),
    controller.blockUser
);

// Unblock User

router.put(
    "/users/:id/unblock",
    auth,
    authorize("admin"),
    controller.unblockUser
);

router.put("/ngos/:id/block", auth, authorize("admin"), controller.blockNGO);
router.put("/ngos/:id/unblock", auth, authorize("admin"), controller.unblockNGO);

// NGO Verification

router.put(
    "/ngo/:id/verify",
    auth,
    authorize(
        "admin",
        "ministry"
    ),
    controller.verifyNGO
);


// ======================================
// UPDATE USER
// PUT /api/v1/admin/users/:id
// ======================================

router.put(
  "/users/:id",
  auth,
  authorize("admin"),
  UserImage.single("image"),
  controller.updateUser
);

// ======================================
// DELETE USER
// DELETE /api/v1/admin/users/:id
// ======================================

router.delete(
  "/users/:id",
  auth,
  authorize("admin"),
  controller.deleteUser
);


module.exports =
router;

// const express = require("express");

// const router = express.Router();

// const controller = require("../controllers/adminController");

// const auth = require("../middlewares/authMiddleware");
// const authorize = require("../middlewares/roleMiddleware");

// const validate = require("../middlewares/validationMiddleware");

// const upload = require("../middlewares/uploadMiddleware");

// const {
//   createUserValidation,
//   updateUserValidation,
//   updateUserRoleValidation,
// } = require("../validators/adminValidation");

// // =================================
// // Dashboard
// // =================================

// router.get(
//   "/dashboard",
//   auth,
//   authorize("admin"),
//   controller.dashboard
// );

// // =================================
// // Analytics
// // =================================

// router.get(
//   "/analytics",
//   auth,
//   authorize("admin"),
//   controller.systemAnalytics
// );

// // =================================
// // Reports
// // =================================

// router.get(
//   "/reports",
//   auth,
//   authorize("admin"),
//   controller.getReports
// );

// // =================================
// // Users
// // =================================

// router.get(
//   "/users",
//   auth,
//   authorize("admin"),
//   controller.getUsers
// );

// router.get(
//   "/users/:id",
//   auth,
//   authorize("admin"),
//   controller.getUser
// );

// // =================================
// // Create User
// // =================================

// router.post(
//   "/users",
//   auth,
//   authorize("admin"),
//   upload.single("image"),
//   validate(createUserValidation),
//   controller.createUser
// );

// // =================================
// // Update User
// // =================================

// router.put(
//   "/users/:id",
//   auth,
//   authorize("admin"),
//   upload.single("image"),
//   validate(updateUserValidation),
//   controller.updateUser
// );

// // =================================
// // Delete User
// // =================================

// router.delete(
//   "/users/:id",
//   auth,
//   authorize("admin"),
//   controller.deleteUser
// );

// // =================================
// // Update User Role
// // =================================

// router.put(
//   "/users/:id/role",
//   auth,
//   authorize("admin"),
//   validate(updateUserRoleValidation),
//   controller.updateUserRole
// );

// // =================================
// // Block User
// // =================================

// router.patch(
//   "/users/:id/block",
//   auth,
//   authorize("admin"),
//   controller.blockUser
// );

// // =================================
// // Unblock User
// // =================================

// router.patch(
//   "/users/:id/unblock",
//   auth,
//   authorize("admin"),
//   controller.unblockUser
// );

// // =================================
// // Verify NGO
// // =================================

// router.patch(
//   "/ngo/:id/verify",
//   auth,
//   authorize("admin", "ministry"),
//   controller.verifyNGO
// );

// module.exports = router;

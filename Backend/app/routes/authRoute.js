const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const AuthCheck = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validationMiddleware");
const UserImage = require("../middlewares/uploadMiddleware");

const {
  signupValidation,
  loginValidation,
  verifyValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../validators/authValidation");

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  UserImage.single("image"),
  validate(signupValidation),
  AuthController.register
);


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successful
 */
router.post(
  "/login",
  validate(loginValidation),
  AuthController.login
);
/**
 * @swagger
 * /api/v1/refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Generate New Access Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New Access Token Generated
 */
router.post(
    "/refresh-token",
    AuthController.refreshToken
);

/**
 * @swagger
 * /api/v1/verify:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email Verified
 */
router.post(
  "/verify",
  validate(verifyValidation),
  AuthController.verify
);
/**
 * @swagger
 * /api/v1/resend-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Resend OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP Sent Successfully
 */
router.post(
  "/resend-otp",
  AuthController.resendOTP
);
/**
 * @swagger
 * /api/v1/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Forgot Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset Link Sent
 */
router.post(
    "/forgot-password",
    validate(forgotPasswordValidation),
    AuthController.forgotPassword
);
/**
 * @swagger
 * /api/v1/reset-password/{token}:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Reset Password
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password Reset Successfully
 */
router.post(
    "/reset-password/:token",
    validate(resetPasswordValidation),
    AuthController.resetPassword
);

// /**
//  * @swagger
//  * /api/v1/profile:
//  *   get:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *       - Authentication
//  *     summary: Get User Profile
//  *     responses:
//  *       200:
//  *         description: User Profile
//  */

// router.get(
//   "/profile",
//   AuthCheck,
//   AuthController.getProfile
// );
/**
 * @swagger
 * /api/v1/admin/dashboard:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Authentication
 *     summary: Admin Dashboard
 *     responses:
 *       200:
 *         description: Admin Dashboard
 */
router.get(
  "/dashboard",
  AuthCheck,
  AuthController.dashboard
);
// /**
//  * @swagger
//  * /api/v1/admin/dashboard:
//  *   get:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *       - Authentication
//  *     summary: Admin Dashboard
//  *     responses:
//  *       200:
//  *         description: Admin Dashboard
//  */
// router.get(
//   "/admin/dashboard",
//   AuthCheck,
//   authorizeRoles("admin"),
//   AuthController.adminDashboard
// );



// /**
//  * @swagger
//  * /api/v1/update-profile:
//  *   put:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *       - Authentication
//  *     summary: Update Profile
//  *     requestBody:
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       200:
//  *         description: Profile Updated
//  */

// router.put(
//     "/update-profile",
//     AuthCheck,
//     UserImage.single("image"),
//     AuthController.updateProfile
// );
// /**
//  * @swagger
//  * /api/v1/change-password:
//  *   put:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *       - Authentication
//  *     summary: Change Password
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             properties:
//  *               oldPassword:
//  *                 type: string
//  *               newPassword:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Password Changed
//  */
// router.post(
//     "/change-password",
//     AuthCheck,
//     AuthController.changePassword
// );



/**
 * @swagger
 * /api/v1/delete-user:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Authentication
 *     summary: Delete User
 *     responses:
 *       200:
 *         description: User Deleted
 */
router.delete(
    "/delete-user",
    AuthCheck,
    AuthController.deleteUser
);
/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Authentication
 *     summary: Logout
 *     responses:
 *       200:
 *         description: Logout Successful
 */
router.post(
    "/logout",
    AuthCheck,
    AuthController.logout
);
// /**
//  * @swagger
//  * /api/v1/block-user/{id}:
//  *   put:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *       - Admin
//  *     summary: Block User
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: User Blocked
//  */
// router.put(
//     "/block-user/:id",
//     AuthCheck,
//     authorizeRoles("admin"),
//     AuthController.blockUser
// );


// /**
//  * @swagger
//  * /api/v1/unblock-user/{id}:
//  *   put:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *       - Admin
//  *     summary: Unblock User
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: User Unblocked
//  */
// router.put(
//     "/unblock-user/:id",
//     AuthCheck,
//     authorizeRoles("admin"),
//     AuthController.unblockUser
// );










module.exports = router;

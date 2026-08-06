const express =
require("express");

const router =
express.Router();


const controller =
require(
    "../controllers/learningController"
);


const auth =
require(
    "../middlewares/authMiddleware"
);


const authorize =
require(
    "../middlewares/roleMiddleware"
);
const UserImage = require("../middlewares/uploadMiddleware");


// =====================================================
// PUBLIC
// =====================================================


// GET /api/learning

router.get(
    "/",
    controller.getLearningHome
);


// GET /api/learning/categories

router.get(
    "/categories",
    controller.getCategories
);


// GET /api/learning/courses

router.get(
    "/courses",
    controller.getCourses
);


// GET /api/learning/search?q=soil

router.get(
    "/search",
    controller.searchCourses
);


// =====================================================
// FARMER
// =====================================================


// GET /api/learning/my-courses

router.get(
    "/my-courses",

    auth,

    authorize(
        "farmer"
    ),

    controller.getMyCourses
);


// POST /api/learning/courses/:id/enroll

router.post(
    "/courses/:id/enroll",

    auth,

    authorize(
        "farmer"
    ),

    controller.enrollCourse
);


// =====================================================
// ADMIN
// =====================================================


// GET ALL COURSES
// Includes active + inactive

router.get(
    "/admin/courses",

    auth,

    authorize(
        "admin"
    ),

    controller.adminGetCourses
);


// CREATE COURSE

router.post(
    "/admin/courses",

    auth,

    authorize(
        "admin"
    ),
UserImage.single("image"),
    controller.createCourse
);


// GET ALL ENROLLMENTS

router.get(
    "/admin/enrollments",

    auth,

    authorize(
        "admin"
    ),

    controller.getAllEnrollments
);


// GET SINGLE COURSE

router.get(
    "/admin/courses/:id",

    auth,

    authorize(
        "admin"
    ),

    controller.adminGetCourseById
);


// UPDATE COURSE

router.patch(
    "/admin/courses/:id",

    auth,

    authorize(
        "admin"
    ),

    controller.updateCourse
);


// DELETE COURSE

router.delete(
    "/admin/courses/:id",

    auth,

    authorize(
        "admin"
    ),

    controller.deleteCourse
);


module.exports =
router;
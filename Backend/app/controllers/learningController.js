const LearningCourse =
require("../models/LearningCourse");

const CourseEnrollment =
require("../models/CourseEnrollment");


class LearningController {

    // =====================================================
    // PUBLIC
    // GET /api/learning
    // =====================================================

    async getLearningHome(req, res) {

        try {

            const [
                courses,
                featuredCourses,
                categories,
                trainers,
                learners
            ] = await Promise.all([

                LearningCourse.countDocuments({
                    status: "active"
                }),

                LearningCourse
                    .find({
                        status: "active",
                        isFeatured: true
                    })
                    .sort({
                        createdAt: -1
                    })
                    .limit(5),

                LearningCourse.distinct(
                    "category",
                    {
                        status: "active"
                    }
                ),

                LearningCourse.distinct(
                    "trainer",
                    {
                        status: "active",
                        trainer: {
                            $ne: ""
                        }
                    }
                ),

                CourseEnrollment.distinct(
                    "user"
                )

            ]);


            return res.status(200).json({

                success: true,

                message:
                    "Learning data fetched successfully",

                data: {

                    stats: {
                        courses,
                        trainers:
                            trainers.length,
                        learners:
                            learners.length
                    },

                    categories,

                    featuredCourses
                }

            });

        }
        catch (error) {

            console.error(
                "Learning Home Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch learning data"

            });
        }
    }


    // =====================================================
    // PUBLIC
    // GET /api/learning/categories
    // =====================================================

    async getCategories(req, res) {

        try {

            const categories =
                await LearningCourse.distinct(
                    "category",
                    {
                        status: "active"
                    }
                );


            return res.status(200).json({

                success: true,

                message:
                    "Categories fetched successfully",

                data:
                    categories

            });

        }
        catch (error) {

            console.error(
                "Get Categories Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch categories"

            });
        }
    }


    // =====================================================
    // PUBLIC
    // GET /api/learning/courses
    // =====================================================

    async getCourses(req, res) {

        try {

            const {
                category,
                level,
                page = 1,
                limit = 10
            } = req.query;


            const filter = {
                status: "active"
            };


            if (category) {

                filter.category =
                    new RegExp(
                        `^${category}$`,
                        "i"
                    );
            }


            if (level) {

                filter.level =
                    new RegExp(
                        `^${level}$`,
                        "i"
                    );
            }


            const currentPage =
                Math.max(
                    Number(page) || 1,
                    1
                );


            const pageLimit =
                Math.min(
                    Math.max(
                        Number(limit) || 10,
                        1
                    ),
                    50
                );


            const skip =
                (currentPage - 1)
                * pageLimit;


            const [
                courses,
                total
            ] = await Promise.all([

                LearningCourse
                    .find(filter)
                    .sort({
                        createdAt: -1
                    })
                    .skip(skip)
                    .limit(pageLimit),

                LearningCourse
                    .countDocuments(filter)

            ]);


            return res.status(200).json({

                success: true,

                message:
                    "Courses fetched successfully",

                data:
                    courses,

                pagination: {

                    total,

                    page:
                        currentPage,

                    limit:
                        pageLimit,

                    totalPages:
                        Math.ceil(
                            total /
                            pageLimit
                        )
                }

            });

        }
        catch (error) {

            console.error(
                "Get Courses Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch courses"

            });
        }
    }


    // =====================================================
    // PUBLIC
    // GET /api/learning/search?q=soil
    // =====================================================

    async searchCourses(req, res) {

        try {

            const {
                q
            } = req.query;


            if (
                !q ||
                !q.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Search keyword is required"

                });
            }


            const search =
                q.trim();


            const courses =
                await LearningCourse.find({

                    status: "active",

                    $or: [

                        {
                            title: {
                                $regex:
                                    search,
                                $options:
                                    "i"
                            }
                        },

                        {
                            description: {
                                $regex:
                                    search,
                                $options:
                                    "i"
                            }
                        },

                        {
                            category: {
                                $regex:
                                    search,
                                $options:
                                    "i"
                            }
                        },

                        {
                            trainer: {
                                $regex:
                                    search,
                                $options:
                                    "i"
                            }
                        }

                    ]

                })
                    .sort({
                        createdAt: -1
                    });


            return res.status(200).json({

                success: true,

                message:
                    "Search completed successfully",

                data:
                    courses

            });

        }
        catch (error) {

            console.error(
                "Search Course Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to search courses"

            });
        }
    }


    // =====================================================
    // FARMER
    // POST /api/learning/courses/:id/enroll
    // =====================================================

    // async enrollCourse(req, res) {

    //     try {

    //         const {
    //             id
    //         } = req.params;


    //         const userId =
    //             req.user.id;


    //         const course =
    //             await LearningCourse.findOne({
    //                 _id: id,
    //                 status: "active"
    //             });


    //         if (!course) {

    //             return res.status(404).json({

    //                 success: false,

    //                 message:
    //                     "Course not found"

    //             });
    //         }


    //         const existing =
    //             await CourseEnrollment.findOne({

    //                 user:
    //                     userId,

    //                 course:
    //                     id

    //             });


    //         if (existing) {

    //             return res.status(400).json({

    //                 success: false,

    //                 message:
    //                     "You are already enrolled in this course"

    //             });
    //         }


    //         const enrollment =
    //             await CourseEnrollment.create({

    //                 user:
    //                     userId,

    //                 course:
    //                     id,

    //                 progress:
    //                     0,

    //                 status:
    //                     "enrolled"

    //             });


    //         await enrollment.populate(
    //             "course"
    //         );


    //         return res.status(201).json({

    //             success: true,

    //             message:
    //                 "Course enrolled successfully",

    //             data:
    //                 enrollment

    //         });

    //     }
    //     catch (error) {

    //         console.error(
    //             "Enroll Course Error:",
    //             error
    //         );


    //         if (
    //             error.code === 11000
    //         ) {

    //             return res.status(400).json({

    //                 success: false,

    //                 message:
    //                     "You are already enrolled in this course"

    //             });
    //         }


    //         return res.status(500).json({

    //             success: false,

    //             message:
    //                 "Failed to enroll course"

    //         });
    //     }
    // }


async enrollCourse(req, res) {
    try {

        const userId =
            req.user.id;

        const courseId =
            req.params.id;

        // =====================================
        // CHECK COURSE
        // =====================================

        const course =
            await LearningCourse.findOne({
                _id: courseId,
                status: "active"
            });

        if (!course) {
            return res.status(404).json({
                success: false,
                message:
                    "Course not found"
            });
        }

        // =====================================
        // CHECK EXISTING ENROLLMENT
        // =====================================

        const existingEnrollment =
            await CourseEnrollment.findOne({
                user: userId,
                course: courseId
            });

        if (existingEnrollment) {
            return res.status(409).json({
                success: false,

                message:
                    "You are already enrolled in this course",

                data:
                    existingEnrollment
            });
        }

        // =====================================
        // CREATE ENROLLMENT
        // =====================================

        const enrollment =
            await CourseEnrollment.create({
                user: userId,
                course: courseId,
                progress: 0,
                status: "enrolled",
                enrolledAt:
                    new Date()
            });

        await enrollment.populate(
            "course"
        );

        return res.status(201).json({
            success: true,

            message:
                "Course enrolled successfully",

            data:
                enrollment
        });

    } catch (error) {

        console.error(
            "Enroll Course Error:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                "Failed to enroll course"
        });
    }
}




    // =====================================================
    // FARMER
    // GET /api/learning/my-courses
    // =====================================================

    async getMyCourses(req, res) {

        try {

            const userId =
                req.user.id;


            const courses =
                await CourseEnrollment
                    .find({
                        user:
                            userId
                    })
                    .populate(
                        "course"
                    )
                    .sort({
                        createdAt: -1
                    });


            return res.status(200).json({

                success: true,

                message:
                    "My courses fetched successfully",

                data:
                    courses

            });

        }
        catch (error) {

            console.error(
                "My Courses Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch your courses"

            });
        }
    }


    // =====================================================
    // ADMIN
    // GET /api/learning/admin/courses
    // =====================================================

    async adminGetCourses(req, res) {

        try {

            const {
                search,
                category,
                level,
                status,
                page = 1,
                limit = 10
            } = req.query;


            const filter = {};


            if (status) {
                filter.status =
                    status;
            }


            if (category) {

                filter.category = {
                    $regex:
                        category,
                    $options:
                        "i"
                };
            }


            if (level) {

                filter.level = {
                    $regex:
                        `^${level}$`,
                    $options:
                        "i"
                };
            }


            if (search) {

                filter.$or = [

                    {
                        title: {
                            $regex:
                                search,
                            $options:
                                "i"
                        }
                    },

                    {
                        category: {
                            $regex:
                                search,
                            $options:
                                "i"
                        }
                    },

                    {
                        trainer: {
                            $regex:
                                search,
                            $options:
                                "i"
                        }
                    }

                ];
            }


            const currentPage =
                Math.max(
                    Number(page) || 1,
                    1
                );


            const pageLimit =
                Math.min(
                    Math.max(
                        Number(limit) || 10,
                        1
                    ),
                    50
                );


            const skip =
                (
                    currentPage - 1
                ) * pageLimit;


            const [
                courses,
                total
            ] = await Promise.all([

                LearningCourse
                    .find(filter)
                    .sort({
                        createdAt: -1
                    })
                    .skip(skip)
                    .limit(pageLimit),

                LearningCourse
                    .countDocuments(filter)

            ]);


            return res.status(200).json({

                success: true,

                message:
                    "Admin courses fetched successfully",

                data:
                    courses,

                pagination: {

                    total,

                    page:
                        currentPage,

                    limit:
                        pageLimit,

                    totalPages:
                        Math.ceil(
                            total /
                            pageLimit
                        )
                }

            });

        }
        catch (error) {

            console.error(
                "Admin Get Courses Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch courses"

            });
        }
    }


    // =====================================================
    // ADMIN
    // CREATE COURSE
    // POST /api/learning/admin/courses
    // =====================================================

    // async createCourse(req, res) {

    //     try {

    //         const {
    //             title,
    //             description,
    //             image,
    //             category,
    //             level,
    //             duration,
    //             trainer,
    //             isFeatured,
    //             isBestseller,
    //             status
    //         } = req.body;


    //         if (
    //             !title ||
    //             !description ||
    //             !category ||
    //             duration === undefined ||
    //             duration === null
    //         ) {

    //             return res.status(400).json({

    //                 success: false,

    //                 message:
    //                     "Title, description, category and duration are required"

    //             });
    //         }


    //         const course =
    //             await LearningCourse.create({

    //                 title,

    //                 description,

    //                 image:
    //                     image || "",

    //                 category,

    //                 level:
    //                     level ||
    //                     "Beginner",

    //                 duration,

    //                 trainer:
    //                     trainer || "",

    //                 isFeatured:
    //                     isFeatured ??
    //                     false,

    //                 isBestseller:
    //                     isBestseller ??
    //                     false,

    //                 status:
    //                     status ||
    //                     "active"

    //             });


    //         return res.status(201).json({

    //             success: true,

    //             message:
    //                 "Course created successfully",

    //             data:
    //                 course

    //         });

    //     }
    //     catch (error) {

    //         console.error(
    //             "Create Course Error:",
    //             error
    //         );

    //         return res.status(500).json({

    //             success: false,

    //             message:
    //                 "Failed to create course"

    //         });
    //     }
    // }
async createCourse(req, res) {
    try {

        console.log(
            "BODY:",
            req.body
        );

        console.log(
            "FILE:",
            req.file
        );

        const {
            title,
            description,
            category,
            level,
            duration,
            trainer,
            isFeatured,
            isBestseller,
            status
        } = req.body;

        const image =
            req.file
                ? `/uploads/courses/${req.file.filename}`
                : "";

        const course =
            await LearningCourse.create({

                title,

                description,

                image,

                category,

                level:
                    level ||
                    "Beginner",

                duration:
                    Number(
                        duration
                    ),

                trainer:
                    trainer || "",

                isFeatured:
                    isFeatured ===
                    "true",

                isBestseller:
                    isBestseller ===
                    "true",

                status:
                    status ||
                    "active"
            });

        return res
            .status(201)
            .json({

                success: true,

                message:
                    "Course created successfully",

                data:
                    course
            });

    } catch (error) {

        console.error(
            "CREATE COURSE ERROR:",
            error
        );

        return res
            .status(500)
            .json({

                success: false,

                message:
                    "Failed to create course",

                error:
                    error.message
            });
    }
}

    // =====================================================
    // ADMIN
    // GET SINGLE COURSE
    // GET /api/learning/admin/courses/:id
    // =====================================================

    async adminGetCourseById(req, res) {

        try {

            const {
                id
            } = req.params;


            const course =
                await LearningCourse.findById(
                    id
                );


            if (!course) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Course not found"

                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Course fetched successfully",

                data:
                    course

            });

        }
        catch (error) {

            console.error(
                "Get Course Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch course"

            });
        }
    }


    // =====================================================
    // ADMIN
    // UPDATE COURSE
    // PATCH /api/learning/admin/courses/:id
    // =====================================================

    async updateCourse(req, res) {

        try {

            const {
                id
            } = req.params;


            const allowedFields = [
                "title",
                "description",
                "image",
                "category",
                "level",
                "duration",
                "trainer",
                "isFeatured",
                "isBestseller",
                "status"
            ];


            const updateData = {};


            allowedFields.forEach(
                (field) => {

                    if (
                        req.body[field]
                        !== undefined
                    ) {

                        updateData[field] =
                            req.body[field];
                    }
                }
            );


            const course =
                await LearningCourse
                    .findByIdAndUpdate(

                        id,

                        updateData,

                        {
                            new: true,
                            runValidators: true
                        }

                    );


            if (!course) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Course not found"

                });
            }


            return res.status(200).json({

                success: true,

                message:
                    "Course updated successfully",

                data:
                    course

            });

        }
        catch (error) {

            console.error(
                "Update Course Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to update course"

            });
        }
    }


    // =====================================================
    // ADMIN
    // DELETE COURSE
    // DELETE /api/learning/admin/courses/:id
    // =====================================================

    async deleteCourse(req, res) {

        try {

            const {
                id
            } = req.params;


            const course =
                await LearningCourse.findById(
                    id
                );


            if (!course) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Course not found"

                });
            }


            // Delete related enrollments first

            await CourseEnrollment.deleteMany({
                course:
                    id
            });


            await LearningCourse.findByIdAndDelete(
                id
            );


            return res.status(200).json({

                success: true,

                message:
                    "Course deleted successfully"

            });

        }
        catch (error) {

            console.error(
                "Delete Course Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to delete course"

            });
        }
    }


    // =====================================================
    // ADMIN
    // GET ALL ENROLLMENTS
    // GET /api/learning/admin/enrollments
    // =====================================================

    async getAllEnrollments(req, res) {

        try {

            const {
                status,
                course,
                page = 1,
                limit = 10
            } = req.query;


            const filter = {};


            if (status) {

                filter.status =
                    status;
            }


            if (course) {

                filter.course =
                    course;
            }


            const currentPage =
                Math.max(
                    Number(page) || 1,
                    1
                );


            const pageLimit =
                Math.min(
                    Math.max(
                        Number(limit) || 10,
                        1
                    ),
                    50
                );


            const skip =
                (
                    currentPage - 1
                ) * pageLimit;


            const [
                enrollments,
                total
            ] = await Promise.all([

                CourseEnrollment
                    .find(filter)

                    .populate({
                        path: "user",
                        select:
                            "name email role"
                    })

                    .populate({
                        path: "course",
                        select:
                            "title image category level duration"
                    })

                    .sort({
                        createdAt: -1
                    })

                    .skip(skip)

                    .limit(pageLimit),

                CourseEnrollment
                    .countDocuments(
                        filter
                    )

            ]);


            return res.status(200).json({

                success: true,

                message:
                    "Enrollments fetched successfully",

                data:
                    enrollments,

                pagination: {

                    total,

                    page:
                        currentPage,

                    limit:
                        pageLimit,

                    totalPages:
                        Math.ceil(
                            total /
                            pageLimit
                        )
                }

            });

        }
        catch (error) {

            console.error(
                "Get Enrollments Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch enrollments"

            });
        }
    }

}


module.exports =
new LearningController();
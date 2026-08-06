const mongoose =
require("mongoose");


const courseEnrollmentSchema =
new mongoose.Schema(
    {
        // =========================
        // FARMER / USER
        // =========================

        user: {
            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                "User",

            required: [
                true,
                "User is required"
            ]
        },


        // =========================
        // COURSE
        // =========================

        course: {
            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                "LearningCourse",

            required: [
                true,
                "Course is required"
            ]
        },


        // =========================
        // COURSE PROGRESS
        // =========================

        progress: {
            type: Number,

            default: 0,

            min: [
                0,
                "Progress cannot be less than 0"
            ],

            max: [
                100,
                "Progress cannot be greater than 100"
            ]
        },


        // =========================
        // ENROLLMENT STATUS
        // =========================

        status: {
            type: String,

            enum: [
                "enrolled",
                "completed"
            ],

            default:
                "enrolled"
        },


        // =========================
        // ENROLLED DATE
        // =========================

        enrolledAt: {
            type: Date,
            default: Date.now
        },


        // =========================
        // COMPLETED DATE
        // =========================

        completedAt: {
            type: Date,
            default: null
        }

    },
    {
        timestamps: true
    }
);


// =====================================
// ONE USER CAN ENROLL ONLY ONCE
// =====================================

courseEnrollmentSchema.index(
    {
        user: 1,
        course: 1
    },
    {
        unique: true
    }
);


// =====================================
// OTHER INDEXES
// =====================================

courseEnrollmentSchema.index({
    user: 1
});

courseEnrollmentSchema.index({
    course: 1
});

courseEnrollmentSchema.index({
    status: 1
});


module.exports =
mongoose.model(
    "CourseEnrollment",
    courseEnrollmentSchema
);
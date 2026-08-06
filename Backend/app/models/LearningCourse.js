const mongoose =
require("mongoose");


const learningCourseSchema =
new mongoose.Schema(
    {
        // =========================
        // COURSE TITLE
        // =========================

        title: {
            type: String,
            required: [
                true,
                "Course title is required"
            ],
            trim: true,
            maxlength: 150
        },


        // =========================
        // DESCRIPTION
        // =========================

        description: {
            type: String,
            required: [
                true,
                "Course description is required"
            ],
            trim: true,
            maxlength: 2000
        },


        // =========================
        // COURSE IMAGE
        // =========================

        image: {
            type: String,
            default: ""
        },


        // =========================
        // CATEGORY
        // =========================

        category: {
            type: String,
            required: [
                true,
                "Course category is required"
            ],
            trim: true
        },


        // =========================
        // COURSE LEVEL
        // =========================

        level: {
            type: String,

            enum: [
                "Beginner",
                "Intermediate",
                "Advanced"
            ],

            default:
                "Beginner"
        },


        // =========================
        // DURATION IN HOURS
        // =========================

        duration: {
            type: Number,

            required: [
                true,
                "Course duration is required"
            ],

            min: [
                0,
                "Duration cannot be negative"
            ]
        },


        // =========================
        // TRAINER
        // =========================

        trainer: {
            type: String,
            trim: true,
            default: ""
        },


        // =========================
        // FEATURED COURSE
        // =========================

        isFeatured: {
            type: Boolean,
            default: false
        },


        // =========================
        // BESTSELLER
        // =========================

        isBestseller: {
            type: Boolean,
            default: false
        },


        // =========================
        // STATUS
        // =========================

        status: {
            type: String,

            enum: [
                "active",
                "inactive"
            ],

            default:
                "active"
        }

    },
    {
        timestamps: true
    }
);


// =============================
// INDEXES
// =============================

learningCourseSchema.index({
    category: 1
});

learningCourseSchema.index({
    status: 1
});

learningCourseSchema.index({
    isFeatured: 1
});

learningCourseSchema.index({
    createdAt: -1
});


module.exports =
mongoose.model(
    "LearningCourse",
    learningCourseSchema
);
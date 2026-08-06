const mongoose = require("mongoose");

// ==========================================
// GOVERNMENT SCHEME SCHEMA
// ==========================================

const governmentSchemeSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        default: "All India",
        trim: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      eligibility: {
        type: String,
        required: true,
        trim: true,
      },

      lastDate: {
        type: Date,
        required: true,
      },

      image: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "Active",
          "Closed",
        ],
        default: "Active",
      },
    },
    {
      timestamps: true,
    }
  );

// ==========================================
// CREATE MODEL
// ==========================================

const GovernmentScheme =
  mongoose.models.GovernmentScheme ||
  mongoose.model(
    "GovernmentScheme",
    governmentSchemeSchema
  );

// ==========================================
// EXPORT MODEL
// ==========================================

module.exports = GovernmentScheme;
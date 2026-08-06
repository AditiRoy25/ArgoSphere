const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema(
  {
    officeName: String,

    address: String,

    phone: String,

    email: String,

    supportEmail: String,

    facebook: String,

    instagram: String,

    twitter: String,

    linkedin: String,

    youtube: String,

    mapUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactInfo",
  contactInfoSchema
);
const Joi =
require("joi");

// =====================================
// CREATE CROP VALIDATION
// =====================================

const createCropValidation = {

    body: Joi.object({

        farm: Joi.string()
            .required()
            .messages({

                "string.empty":
                    "Farm is required.",

                "any.required":
                    "Farm is required."

            }),

        cropName: Joi.string()
            .trim()
            .min(2)
            .max(100)
            .required()
            .messages({

                "string.empty":
                    "Crop name is required.",

                "any.required":
                    "Crop name is required."

            }),

        sowingDate: Joi.date()
            .required(),

        fertilizerDate: Joi.date()
            .allow(null),

        irrigationDate: Joi.date()
            .allow(null),

        harvestDate: Joi.date()
            .required(),

        notes: Joi.string()
            .allow("")
            .max(500)

    })

};

// =====================================
// UPDATE CROP VALIDATION
// =====================================

const updateCropValidation = {

    body: Joi.object({

        farm: Joi.string(),

        cropName: Joi.string()
            .trim()
            .min(2)
            .max(100),

        sowingDate: Joi.date(),

        fertilizerDate: Joi.date()
            .allow(null),

        irrigationDate: Joi.date()
            .allow(null),

        harvestDate: Joi.date(),

        notes: Joi.string()
            .allow("")
            .max(500)

    })

};

module.exports = {

    createCropValidation,

    updateCropValidation

};
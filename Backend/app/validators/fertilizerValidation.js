
const Joi = require("joi");

exports.createFertilizerValidation =
Joi.object({

    name: Joi.string()
        .required(),

    type: Joi.string()
        .required(),

    price: Joi.number()
        .required(),

    stock: Joi.number()
        .required(),

    organicCertification:
        Joi.boolean(),

    image: Joi.string()
        .allow(""),

    description: Joi.string()
        .allow("")
});

exports.updateFertilizerValidation =
Joi.object({

    name: Joi.string(),

    type: Joi.string(),

    price: Joi.number(),

    stock: Joi.number(),

    organicCertification:
        Joi.boolean(),

    image: Joi.string()
        .allow(""),

    description: Joi.string()
        .allow("")
});


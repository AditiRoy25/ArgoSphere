
const Joi = require("joi");

exports.createNGOValidation =
Joi.object({

    organizationName:
    Joi.string()
    .required(),

    registrationNumber:
    Joi.string()
    .required(),

    address:
    Joi.string()
    .required(),

    website:
    Joi.string()
    .allow(""),

    description:
    Joi.string()
    .allow("")
});

exports.updateNGOValidation =
Joi.object({

    organizationName:
    Joi.string(),

    registrationNumber:
    Joi.string(),

    address:
    Joi.string(),

    district:
    Joi.string(),

    state:
    Joi.string(),

    phone:
    Joi.string(),

    email:
    Joi.string().email(),

    website:
    Joi.string(),

    description:
    Joi.string()
});


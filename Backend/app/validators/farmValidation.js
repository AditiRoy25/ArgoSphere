
const Joi = require("joi");

exports.createFarmValidation =
Joi.object({

    farmer:
    Joi.string()
    .required(),

    farmName:
    Joi.string()
    .required(),

    farmArea:
    Joi.number()
    .required(),

    soilType:
    Joi.string()
    .required(),

    irrigationType:
    Joi.string()
    .required()

});


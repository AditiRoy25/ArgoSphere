

const Joi = require("joi");

exports.updateProfileValidation =
Joi.object({

    gender:
    Joi.string().valid(
        "male",
        "female",
        "other"
    ),

    address:
    Joi.string(),

    district:
    Joi.string(),

    state:
    Joi.string()

});

exports.changePasswordValidation =
Joi.object({

    currentPassword:
    Joi.string()
    .required(),

    newPassword:
    Joi.string()
    .min(6)
    .required()

});


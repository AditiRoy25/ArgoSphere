
const Joi = require("joi");

exports.updateUserRoleValidation =
Joi.object({

    role: Joi.string()
        .valid(
            "farmer",
            "ngo",
            "officer",
            "ministry",
            "admin"
        )
        .required()

});

exports.userStatusValidation =
Joi.object({

    status: Joi.string()
        .valid(
            "active",
            "blocked"
        )
        .required()

});


const Joi =
require("joi");

exports.applySchemeValidation =
Joi.object({

    schemeId:Joi.string()
        .required()

});

exports.createSchemeValidation =
Joi.object({

    title:Joi.string()
        .required(),

    description:Joi.string()
        .required(),

    amount:Joi.number()
        .required(),

    eligibility:Joi.string()
        .required(),

    lastDate:Joi.date()
        .required(),

    image:Joi.string()
        .allow("",null),

    status:Joi.string()
        .valid(
            "Active",
            "Closed"
        )

});
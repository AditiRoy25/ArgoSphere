
const Joi = require("joi");

exports.createWeatherAlertValidation =
Joi.object({

    district: Joi.string()
        .required(),

    state: Joi.string()
        .required(),

    alertType: Joi.string()
        .valid(
            "rain",
            "storm",
            "flood",
            "heatwave",
            "coldwave",
            "cyclone"
        )
        .required(),

    severity: Joi.string()
        .valid(
            "low",
            "medium",
            "high"
        )
        .required(),

    temperature: Joi.number(),

    rainfall: Joi.number(),

    humidity: Joi.number(),

    windSpeed: Joi.number(),

    message: Joi.string()
        .required(),

    startDate: Joi.date()
        .required(),

    endDate: Joi.date()
        .required()

});

exports.updateWeatherAlertValidation =
Joi.object({

    district: Joi.string(),

    state: Joi.string(),

    alertType: Joi.string(),

    severity: Joi.string(),

    temperature: Joi.number(),

    rainfall: Joi.number(),

    humidity: Joi.number(),

    windSpeed: Joi.number(),

    message: Joi.string(),

    startDate: Joi.date(),

    endDate: Joi.date()

});


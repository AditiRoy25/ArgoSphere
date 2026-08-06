
const Joi = require("joi");

exports.dateRangeValidation =
Joi.object({

    startDate:
    Joi.date(),

    endDate:
    Joi.date()

});

exports.yearValidation =
Joi.object({

    year:
    Joi.number()
    .required()

});



const Joi = require("joi");

exports.chatValidation =
Joi.object({

    message: Joi.string()
        .required(),

    conversationId:
    Joi.string()
        .allow("")
});

exports.cropRecommendationValidation =
Joi.object({

    soilType: Joi.string()
        .required(),

    season: Joi.string()
        .required(),

    district: Joi.string()
        .required(),

    farmSize: Joi.number()
});

exports.diseasePredictionValidation =
Joi.object({

    cropName: Joi.string()
        .required(),

    symptoms: Joi.array()
        .items(
            Joi.string()
        )
        .required()

});

exports.fertilizerSuggestionValidation =
Joi.object({

    cropName: Joi.string()
        .required(),

    soilType: Joi.string()
        .required(),

    farmSize: Joi.number()
        .required()

});


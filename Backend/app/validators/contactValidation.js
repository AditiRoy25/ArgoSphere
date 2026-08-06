const Joi = require("joi");

exports.contactValidation = Joi.object({
  name: Joi.string().min(2).max(100).required(),

  email: Joi.string().email().required(),

  phone: Joi.string().allow("", null),

  subject: Joi.string().min(3).max(200).required(),

  message: Joi.string().min(10).required(),
});

exports.contactInfoValidation = Joi.object({
  officeName: Joi.string().required(),

  address: Joi.string().required(),

  phone: Joi.string().required(),

  email: Joi.string().email().required(),

  supportEmail: Joi.string().email(),

  facebook: Joi.string().allow("", null),

  instagram: Joi.string().allow("", null),

  twitter: Joi.string().allow("", null),

  linkedin: Joi.string().allow("", null),

  youtube: Joi.string().allow("", null),

  mapUrl: Joi.string().allow("", null),
});
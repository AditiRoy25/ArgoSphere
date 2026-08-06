

const Joi = require("joi");

exports.signupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
  .valid("farmer", "ngo", "officer", "ministry", "admin")
  .optional(),
});

exports.loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.verifyValidation = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

exports.forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});

exports.resetPasswordValidation = Joi.object({
  password: Joi.string().min(6).required(),
});

// exports.updateProfileValidation = Joi.object({
//     name: Joi.string().optional(),
//     phone: Joi.string().optional()
// });

const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.base": "Username should be string",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password is required",
    "string.min": `Password should be of minimum {#limit} digits`,
  }),
  confirmPassword: Joi.string().min(8).required().messages({
    "any.required": "Password is required",
    "string.min": `Password should be of minimum {#limit} digits`,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({ "any.required": "Email is required" }),
});

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.base": "Username should be string",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password is required",
    "string.min": `Password should be of minimum {#limit} digits`,
  }),
  deviceToken: Joi.string(),
});

const updateSchema = Joi.object({
  username: Joi.string().messages({
    "any.required": "Username is required",
    "string.base": "Username should be string",
  }),
  password: Joi.string().min(8).messages({
    "any.required": "Password is required",
    "string.min": `Password should be of minimum {#limit}`,
  }),
  confirmPassword: Joi.string().min(8).messages({
    "any.required": "Password is required",
    "string.min": `Password should be of minimum {#limit}`,
  }),
  oldPassword: Joi.string().min(8).messages({
    "any.required": "Password is required",
    "string.min": `Password should be of minimum {#limit}`,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({ "any.required": "Email is required" }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({ "any.required": "Email is required" }),
});

const tokenSchema = Joi.object({
  token: Joi.string()
    .required()
    .messages({ "any.required": "Token is required" }),
});

const resetSchema = Joi.object({
  password: Joi.string().min(8).messages({
    "any.required": "Password is required",
    "string.min": `Password should be of minimum {#limit}`,
  }),
});

module.exports = {
  signupSchema,
  loginSchema,
  updateSchema,
  forgotPasswordSchema,
  resetSchema,
  tokenSchema,
};

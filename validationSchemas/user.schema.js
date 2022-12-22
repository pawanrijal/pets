const Joi = require("joi");

const signupSchema = Joi.object({

  username: Joi.string().required().messages({ "any.required": "Username is required", "string.base": "Username should be string" }),
  password: Joi.string().min(8).required().messages({ "any.required": "Password is required", "string.min": `String should be of minimum {#limit}` }),
  confirm_password: Joi.string().min(8).required().messages({ "any.required": "Password is required", "string.min": `String should be of minimum {#limit}` }),
  // profile_pic: Joi.string().messages({'string.base': `"profile_pic" should be a type of 'text'`}),
  email: Joi.string().email({ tlds: { allow: false } }),
});

const loginSchema = Joi.object({
  username: Joi.string().required().messages({ "any.required": "Username is required", "string.base": "Username should be string" }),
  password: Joi.string().min(8).required().messages({ "any.required": "Password is required", "string.min": `String should be of minimum {#limit}` }),
});

module.exports = { signupSchema, loginSchema };

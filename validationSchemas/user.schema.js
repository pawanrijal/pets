const Joi = require("joi");

const signupSchema = Joi.object({

  username: Joi.string().required().messages({ "any.required": "Username is required", "string.base": "Username should be string" }),
  password: Joi.string().min(8).required().messages({ "any.required": "Password is required", "string.min": `Password should be of minimum {#limit}` }),
  confirm_password: Joi.string().min(8).required().messages({ "any.required": "Password is required", "string.min": `Password should be of minimum {#limit}` }),
  profile_pic: Joi.allow(),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({ "any.required": "Email is required" }),
});

const loginSchema = Joi.object({
  username: Joi.string().required().messages({ "any.required": "Username is required", "string.base": "Username should be string" }),
  password: Joi.string().min(8).required().messages({ "any.required": "Password is required", "string.min": `Password should be of minimum {#limit}` }),
});

const updateSchema = Joi.object({
  username: Joi.string().messages({ "any.required": "Username is required", "string.base": "Username should be string" }),
  password: Joi.string().min(8).messages({ "any.required": "Password is required", "string.min": `Password should be of minimum {#limit}` }),
  confirm_password: Joi.string().min(8).messages({ "any.required": "Password is required", "string.min": `Password should be of minimum {#limit}` }),
  old_password: Joi.string().min(8).messages({ "any.required": "Password is required", "string.min": `Password should be of minimum {#limit}` }),
  email: Joi.string().email({ tlds: { allow: false } }).messages({ "any.required": "Email is required" }),

})

const forgotPasswordSchema = Joi.object({
  email: Joi.string().required().email({ tlds: { allow: false } }).messages({ "any.required": "Email is required" })
});

const resetSchema=Joi.object({
  token: Joi.string().required().messages({ "any.required": "Token is required"})
})

module.exports = { signupSchema, loginSchema, updateSchema, forgotPasswordSchema,resetSchema };

const Joi = require("joi");

const signupSchema = Joi.object({

  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirm_password:Joi.string().min(8).required(),
  profile_pic: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phone:Joi.string().required().min(10),
});

const loginSchema = Joi.object({

  username: Joi.string().required(),
  password: Joi.string().min(8).required(),

});

module.exports = { signupSchema,loginSchema };

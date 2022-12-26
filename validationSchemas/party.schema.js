const Joi = require("joi");

const partySchema = Joi.object({

  name: Joi.string().required().messages({ "any.required": "Party Name is required", "string.base": "Party Name should be string" }),
  contact_no: Joi.string().required().regex(/^[0-9]{10}$/).messages({"any.required": "Contact number is required",'string.pattern.base': `Contact number must have 10 digits.`}),
  email: Joi.string().required().email({ tlds: { allow: false } }).messages({ "any.required": "Email is required" }),
});

module.exports = { partySchema };

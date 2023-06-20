const Joi = require("joi");

const targetSchema = Joi.object({
  targetAmount: Joi.number().required().messages({
    "any.required": "Target Amount is required",
    "number.base": "Target Amount should be number",
  }),
  savedAlready: Joi.number().required().messages({
    "number.base": "Already Saved amount should be number",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name should be string",
  }),
  description: Joi.string().messages({
    "string.base": "Description should be string",
  }),
  category: Joi.number().messages({
    "number.required": "Category is required",
  }),
});

module.exports = { targetSchema };

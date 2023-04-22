const Joi = require("joi");

const goalSchema = Joi.object({

  targetAmount: Joi.number().required().messages({ "any.required": "Target Amount is required", "number.base": "Target Amount should be number" }),
  name: Joi.string().required().messages({ "any.required": "Name is required", "string.base": "Name should be string" }),
  description: Joi.string().messages({ "string.base": "Description should be string" }),
  categoryId: Joi.number().required().messages({ "any.required": "Category is required", "number.base": "Category Id should be number" }),
});

module.exports = { goalSchema };

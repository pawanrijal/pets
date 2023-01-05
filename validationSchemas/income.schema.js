const Joi = require("joi");

const incomeSchema = Joi.object({

  amount: Joi.number().required().messages({ "any.required": "Amount is required", "number.base": "Income should be number" }),
  paymentMethod: Joi.string().required().messages({ "any.required": "Payment Method is required", "string.base": "Payment Method should be string" }),
  note: Joi.string().messages({"string.base": "Payment Method should be string" }),
  date:Joi.date().required().messages({"date.base":"Date is not valid","any.required": "Date is required"}),
  categoryId:Joi.number().required().messages({"any.required": "Category is required","number.base": "Category Id should be number" })
});

module.exports = { incomeSchema };

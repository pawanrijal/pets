const Joi = require("joi");

const transactionSchema = Joi.object({

  amount: Joi.number().required().messages({ "any.required": "Amount is required", "number.base": "Amount should be number" }),
  paymentMethod: Joi.string().required().messages({ "any.required": "Payment Method is required", "string.base": "Payment Method should be string" }),
  note: Joi.string().messages({"string.base": "Payment Method should be string" }),
  date:Joi.date().required().messages({"date.base":"Date is not valid","any.required": "Date is required"}),
  partyId:Joi.number().required().messages({"any.required": "Party is required","number.base": "party Id should be number" }),
  type:Joi.string().required().messages({ "any.required": "Type is required", "string.base": "Type should be string" }),
  receiptNo:Joi.string(),
  image:Joi.string(),
  partyId:Joi.number().required()
});

module.exports = { transactionSchema };

const Joi = require("joi");

const partySchema = Joi.object({

  name: Joi.string().required(),
  contact_no:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
});

module.exports = { partySchema };

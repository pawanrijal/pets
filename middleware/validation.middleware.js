const validator = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error||(error===undefined && value===undefined)) {
      error.status=400;
      next(error)
    } else {
      console.log("valitated");
      next();
    }
  };
};

module.exports = validator;

const successResponse = (res, status, data, message, meta) => {
  response = {};
  response.status = status;
  response.data = data;
  if (meta != null && meta != undefined) {
    response.meta = meta;
  }
  response.message = message;
  return res.json(response);
};

module.exports = successResponse;

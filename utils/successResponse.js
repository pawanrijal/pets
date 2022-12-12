const successResponse = (res, status, data, message) => {
  response = {};
  response.status = status;
  response.data = data;
  response.message = message;
  return res.json(response);
};

module.exports = successResponse;

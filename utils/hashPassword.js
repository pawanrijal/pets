const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10; //password hash
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = { hashPassword };

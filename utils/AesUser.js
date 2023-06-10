const IAes = require("../algorithm/aes");

function EncryptUser(payload) {
  const { username, password, email } = payload;
  const encryptedData = {};
  encryptedData.username = username;
  encryptedData.email = IAes.encrypt(email, process.env.ENCRYPTION_SECRET, 256);
  encryptedData.password = password; //Not encrypting passwords
  return encryptedData;
}

function DecryptUser(payload) {
  const { username, password, email } = payload;
  const decryptedData = {};
  decryptedData.username = username;
  if (email !== null && email !== undefined)
    decryptedData.email = IAes.decrypt(
      email,
      process.env.ENCRYPTION_SECRET,
      256
    );
  decryptedData.password = password; //Not encrypting passwords
  return decryptedData;
}

module.exports = { EncryptUser, DecryptUser };

const imageDecryptionMiddleware = (req, res, next) => {
  const { encrypted } = req.query;
  const fileName = IAes.decrypt(encrypted, process.env.ENCRYPTION_SECRET, 256);

  // Assuming the decrypted filename is a relative path to the image file
  req.filePath = path.join(__dirname, "uploads", fileName);
  next();
};

module.exports = { imageDecryptionMiddleware };

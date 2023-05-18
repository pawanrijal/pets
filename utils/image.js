const fs = require("fs");

const deleteImage = (filePath) => {
  if (filePath != null && filePath != undefined) {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
};
module.exports = { deleteImage };

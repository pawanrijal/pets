const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "./uploads";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  fileName: (res, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({ storage: storage });


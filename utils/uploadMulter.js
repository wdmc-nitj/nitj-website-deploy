//imports ----------------------------------------------------->
const multer = require("multer");
const path = require("path");

//config ------------------------------------------------------>
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "nitj_files"));
  },
  filename: (req, file, cb) => {
    let newfilename = `${Date.now()}-${file.originalname}`;
    file.newfilename = newfilename;
    cb(null, newfilename);
  },
});

//multer ------------------------------------------------------>
const multerFunction = multer({
  storage: storage,
});

//*Here file fieldname is "file" in the form
const singleFileMiddleware = multerFunction.single("file");

//Exports ---------------------------------------------------->
module.exports = { singleFileMiddleware };

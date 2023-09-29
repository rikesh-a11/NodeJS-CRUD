const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //logic to valid the file type(mimeType)

    const allowedFileType = ['image/png','image/jpeg','image/jpg']
    if(!allowedFileType.includes(file.mimetype)){
      cb(new Error("Invalid fileType. Only supports png,jpeg,jpg")) //cb(error)
      return;
    }

    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

module.exports = {
  multer,
  storage
};
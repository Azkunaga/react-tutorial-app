const multer = require('multer');

const imageUploadPath = 'public/userImages/';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const imageUpload = multer({storage: storage})

module.exports = imageUpload;
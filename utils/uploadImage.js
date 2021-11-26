const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  console.log(file)
  if(
    (file.mimetype).includes('gif') || 
    (file.mimetype).includes('png') || 
    (file.mimetype).includes('jpeg') ||
    (file.mimetype).includes('webp') ||
    (file.mimetype).includes('bmp')
  ){
    cb(null, true);
  } else{
    cb(null, false);
  }
};

let upload = multer({storage, fileFilter})

module.exports = {upload: upload.single('image')}

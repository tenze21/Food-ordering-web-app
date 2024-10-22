const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

//multer middleware
const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024},//5mb
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){
      return cb(null, true);
    }else{
      cb(new Error('Only images in jpeg, jpg and png format are allowed'));
    }
  }
});

module.exports = upload;
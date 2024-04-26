import multer from 'multer';
import fs from 'fs';

const uploadDir = 'public/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + "_" + file.originalname);
  }
});

export const upload = multer({storage: storage});

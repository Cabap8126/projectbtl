const multer = require('multer');
// gửi file thông qua multer (đọc thêm ở npmjs.com)
module.exports = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      const fixedName = Buffer
        .from(file.originalname, "latin1")
        .toString("utf8");
      cb(null, `${uniqueSuffix}-${fixedName}`);
    },
  });
  return storage
} //end
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: function(req, file, callback) {
    if (path.extname(file.originalname) !== ".db") {
      return callback(new Error("Invalid file. Only files with the extension '.db' are supported."), "");
    }
    callback(null, "database.db");
  }
});

const upload = multer({
  storage: storage,
}).single("database");

export default upload;
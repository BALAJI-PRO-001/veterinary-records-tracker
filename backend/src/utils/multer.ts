import multer from "multer";
import { SQLITE3_DATABASE_DIR_PATH } from "./constants";


const storage = multer.diskStorage({
  destination: SQLITE3_DATABASE_DIR_PATH,
  filename: function(req, file, callback) {
    if (file.originalname !== "database.db") {
      return callback(new Error("Invalid file extension. Only .db files are allowed"), "");
    }
  }
});

const upload = multer({
  storage: storage,
}).single("database");

export default upload;
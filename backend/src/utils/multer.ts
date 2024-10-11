import multer from "multer";
import path from "path";
import { SQLITE3_DATABASE_DIR_PATH } from "./constants";


const storage = multer.diskStorage({
  destination: path.dirname(SQLITE3_DATABASE_DIR_PATH),
  filename: function(req, file, callback) {
    if (path.extname(file.originalname) !== "db") {
      return callback(new Error("Invalid file ext name"), "");
    }
  }
});

const upload = multer({
  storage: storage,
});
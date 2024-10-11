import multer from "multer";
import path from "path";

class Multer {
  storage: any | null;
  constructor(distDirPath: string, uploadFileName: string) {
    this.storage = multer.diskStorage({
      destination: distDirPath,
      filename: function(req, file, callback) {
        // callback(null, )
      }
    });
  }
}
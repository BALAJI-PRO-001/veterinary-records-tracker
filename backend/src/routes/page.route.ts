import express from "express";
import { 
  indexPage, 
  homePage, 
  addNewRecordPage,
  superUserLoginPage
} from "../controllers/page.controller";

const router = express.Router();

router.get("/", indexPage)
      .get("/home", homePage)
      .get("/add-new-record", addNewRecordPage)
      .get("/maintenance/super-user/login", superUserLoginPage);

export default router;
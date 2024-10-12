import express from "express";
import privateRoute from "../utils/privateRoute";
import { 
  indexPage, 
  homePage, 
  addNewRecordPage,
  superUserLoginPage,
  dashboardPage
} from "../controllers/page.controller";

const router = express.Router();

router.get("/", indexPage)
      .get("/home", homePage)
      .get("/add-new-record", addNewRecordPage)
      .get("/maintenance/super-user/login", superUserLoginPage)
      .get("/maintenance/super-user/dashboard", privateRoute , dashboardPage);
 
export default router;
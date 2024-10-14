import express from "express";
import privateRoute from "../utils/privateRoute";
import { 
  indexPage, 
  homePage, 
  addNewRecordPage,
  superUserLoginPage,
  dashboardPage,
  showRecordPage
} from "../controllers/page.controller";

const router = express.Router();

router.get("/", indexPage)
      .get("/home", homePage)
      .get("/add-new-record", addNewRecordPage)
      .get("/super-user/login", superUserLoginPage)
      .get("/super-user/dashboard", privateRoute , dashboardPage)
      .get("/record/:id", showRecordPage);
 
export default router;
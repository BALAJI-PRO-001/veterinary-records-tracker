import express from "express";
import privateRouteForSuperUser from "../utils/privateRouteForSuperUser";
import privateRouteForAdmin from "../utils/privateRouteForAdmin";
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
      .get("/home", privateRouteForAdmin, homePage)
      .get("/add-new-record", privateRouteForAdmin, addNewRecordPage)
      .get("/super-user/login", privateRouteForAdmin, superUserLoginPage)
      .get("/super-user/dashboard", privateRouteForSuperUser , dashboardPage)
      .get("/record/:id", privateRouteForAdmin, showRecordPage);
 
export default router;
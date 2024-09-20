import express from "express";
import { indexPage, homePage, addNewRecordPage } from "../controllers/page.controller";

const router = express.Router();

router.get("/", indexPage)
      .get("/home", homePage)
      .get("/add-new-record", addNewRecordPage);

export default router;
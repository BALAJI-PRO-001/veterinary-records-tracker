import express from "express";
import { login, logOut } from "../controllers/admin.controller";

const router = express.Router();

router.post("/admin/login", login)
      .get("/admin/log-out", logOut);

export default router;
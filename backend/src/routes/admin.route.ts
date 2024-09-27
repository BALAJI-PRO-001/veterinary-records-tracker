import express from "express";
import { login, logOut } from "../controllers/admin.controller";
import validateAdminCredentials from "../utils/validateAdminCredentials";

const router = express.Router();

router.post("/login", validateAdminCredentials, login)
      .get("/logout", logOut);

export default router;
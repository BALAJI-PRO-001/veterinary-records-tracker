import express from "express";
import { createNewRecord, getAllRecords } from "../controllers/record.controller";


const router = express.Router();

router.post("/records", createNewRecord);

router.get("/records/all", getAllRecords);


export default router;
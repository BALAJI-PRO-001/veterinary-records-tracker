import express from "express";
import { 
  createNewRecord, 
  getAllRecords,
  getRecordByUserId,
  deleteAllRecords,
  deleteRecord,
  addNewCowToUser
} from "../controllers/record.controller";


const router = express.Router();

router.post("/records", createNewRecord)
      .post("/records/:userId/cows", addNewCowToUser);

router.get("/records/all", getAllRecords)
      .get("/records/:userId", getRecordByUserId);

router.delete("/records/all", deleteAllRecords)
      .delete("/records/:userId", deleteRecord);


export default router;
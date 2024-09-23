import express from "express";
import { 
  createNewRecord, 
  getAllRecords,
  getRecordByUserId,
  deleteAllRecords,
  deleteRecord,
  addNewCowToUser,
  deleteCowFromUser,
  addNewInjectionInfoAndAiDatesToCow,
  removeInjectionInfoAndAiDatesFromCow
} from "../controllers/record.controller";


const router = express.Router();

router.post("/records", createNewRecord)
      .post("/records/:userId/cows", addNewCowToUser)
      .post("/records/:userId/cows/:cowId/inject-info-ai-dates", addNewInjectionInfoAndAiDatesToCow);

router.get("/records/all", getAllRecords)
      .get("/records/:userId", getRecordByUserId);

router.delete("/records/all", deleteAllRecords)
      .delete("/records/:userId", deleteRecord)
      .delete("/records/:userId/cows/:cowId", deleteCowFromUser)
      .delete("/records/:userId/cows/:cowId/inject-info-ai-dates/:id", removeInjectionInfoAndAiDatesFromCow);


export default router;
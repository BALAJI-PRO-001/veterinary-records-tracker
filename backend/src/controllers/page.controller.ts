import { Request, Response } from "express";
import fs from "fs";
import { 
  HEADER_COMPONENT_FILE_PATH,
  HOME_PAGE_FILE_PATH,
  INDEX_PAGE_FILE_PATH,
  ADD_NEW_RECORD_PAGE_PATH
} from "../utils/constants";



const headerHTML: string = fs.readFileSync(HEADER_COMPONENT_FILE_PATH, "utf-8");
const indexHTML: string = fs.readFileSync(INDEX_PAGE_FILE_PATH, "utf-8");
const homePageHTML: string = fs.readFileSync(HOME_PAGE_FILE_PATH, "utf-8");
const addNewRecordPageHTML: string = fs.readFileSync(ADD_NEW_RECORD_PAGE_PATH, "utf-8");


export function indexPage(req: Request, res: Response) {
  res.end(indexHTML.replace("{{HEADER}}", headerHTML));
}    



export function homePage(req: Request, res: Response) {
  res.end(homePageHTML.replace("{{HEADER}}", headerHTML));
}


export function addNewRecordPage(req: Request, res: Response) {
  res.end(addNewRecordPageHTML.replace("{{HEADER}}", headerHTML));
}

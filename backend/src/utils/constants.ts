import path from "path";


export const SQLITE3_DATABASE_DIR_PATH = path.join(__dirname, "../db/sqlite3/db/");
export const RECORDS_CSV_FILE_PATH = path.join(__dirname, "../data/records.csv");

export const HEADER_COMPONENT_FILE_PATH = path.join(__dirname, "../../../client/views/components/header.component.html");
export const INDEX_PAGE_FILE_PATH = path.join(__dirname, "../../../client/views/index.html");
export const HOME_PAGE_FILE_PATH = path.join(__dirname, "../../../client/views/pages/home.html");
export const ADD_NEW_RECORD_PAGE_PATH = path.join(__dirname, "../../../client/views/pages/add-new-record.html");
export const STATIC_FILE_PATH = path.join(__dirname, "../../../client/public");


export const CSV_WRITER_HEADERS = [
  {id: "id", title: "USER_ID"},
  {id: "name", title: "NAME"},
  {id: "phoneNumber", title: "PHONE_NUMBER"},
  {id: "address", title: "ADDRESS"},
  {id: "cowNames", title: "COW_NAMES"},
  {id: "cowBreeds", title: "COW_BREEDS"},
  {id: "bullNames", title: "BULL_NAMES"},
  {id: "injectionNames", title: "INJECTION_NAMES"},
  {id: "injectionPrice", title: "INJECTION_PRICE"},
  {id: "givenAmount", title: "GIVEN_AMOUNT"},
  {id: "pendingAmount", title: "PENDING_AMOUNT"},
  {id: "dates", title: "AI_DATE"},
  {id: "recordCreatedAt", title: "DATE_AND_TIME_IN_DB"}
];
import path from "path";


export const SQLITE3_DATABASE_DIR_PATH = path.join(__dirname, "../db/sqlite3/db/");
export const RECORDS_CSV_FILE_PATH = path.join(__dirname, "../data/records.csv");

export const HEADER_COMPONENT_FILE_PATH = path.join(__dirname, "../../../client/views/components/header.component.html");
export const INDEX_PAGE_FILE_PATH = path.join(__dirname, "../../../client/views/index.html");
export const HOME_PAGE_FILE_PATH = path.join(__dirname, "../../../client/views/pages/home.html");
export const ADD_NEW_RECORD_PAGE_PATH = path.join(__dirname, "../../../client/views/pages/add-new-record.html");
export const STATIC_FILE_PATH = path.join(__dirname, "../../../client/public");


export const CSV_WRITER_HEADERS = [
  {id: "user", title: "USER_ID"},
  // {id: "user.name", title: "NAME"},
  // {id: "user.phoneNumber", title: "PHONE_NUMBER"},
  // {id: "user.address", title: "ADDRESS"},
  // {id: "cows", title: "COW_NAMES"},
  {id: "recordCreatedAt", title: "DATE_AND_TIME_IN_DB"}
];
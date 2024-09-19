const CREATE_USERS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS USERS (
                                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                  NAME VARCHAR(50) NOT NULL,
                                  PHONE_NUMBER INT UNIQUE NOT NULL,
                                  ADDRESS VARCHAR(255) NOT NULL,
                                  IS_CURRENT_USER BOOLEAN DEFAULT TRUE,
                                  DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME'))
                                )`.toLowerCase();




const CREATE_COWS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS COWS (
                                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                USER_ID INTEGER NOT NULL,
                                COW_NAME VARCHAR(100) NOT NULL,
                                COW_BREED VARCHAR(100) NOT NULL,
                                BULL_NAME VARCHAR(100) NOT NULL,
                                DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME')),
                                FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
                              )`.toLowerCase();      
                              
                              



const CREATE_INJECTION_INFO_AND_AI_DATES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS INJECTION_INFO_AND_AI_DATES (
                                                        ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                                        COW_ID INTEGER NOT NULL,
                                                        NAME VARCHAR(50) NOT NULL,
                                                        COST DECIMAL(10, 2) NOT NULL,
                                                        DATE VARCHAR(20) NOT NULL,
                                                        DATE_AND_TIME DATETIME DEFAULT (DATETIME('NOW', 'LOCALTIME')),
                                                        FOREIGN KEY (COW_ID) REFERENCES COWS(ID)                                                     
                                                      )`.toLowerCase();                                 

export default {
  CREATE_USERS_TABLE_SQL,
  
  CREATE_COWS_TABLE_SQL,

  CREATE_INJECTION_INFO_AND_AI_DATES_TABLE_SQL,
};
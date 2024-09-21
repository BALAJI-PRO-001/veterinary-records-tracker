import sqlite3 from "../db/sqlite3";
import queries from "../db/sqlite3/queries";



interface NewCow {
  userId: number,
  name: string,
  breed: string,
  bullName: string,
  injectionInfoAndAiDates: Array<{
    name: string, 
    cost: number,
    date: string
  }>
}



interface Cow {
  id: number,
  userId?: number,
  name: string,
  breed: string, 
  bullName: string,
  injectionInfoAndAiDates: Array<{
    id: number,
    name: string,
    cost: number,
    date: string
  }>
  createdAt: string
}



interface CowRecordStructureInDB {
  id: number,
  user_id: number,
  name: string,
  breed: string, 
  bull_name: string
  date_and_time: string
}



interface InjectionInfoAndAiDatesStructureInDB {
  id: number,
  name: string,
  cost: number,
  date: string,
}


async function addNewCow(newCow: NewCow): Promise<Cow> {
  await sqlite3.insert(queries.INSERT_COW_RECORD_SQL, newCow.userId, newCow.name, newCow.breed, newCow.bullName);
  const createdCow = await sqlite3.select(queries.SELECT_LAST_COW_RECORD_SQL, false) as CowRecordStructureInDB;

  for (let { name, cost, date } of newCow.injectionInfoAndAiDates) {
    await sqlite3.insert(queries.INSERT_INJECTION_INFO_AND_AI_DATES_RECORD_SQL, createdCow.id, name, cost, date);
  }

  const newInjectionInfoAndAiDates = await sqlite3.select(queries.SELECT_INJECTION_INFO_AND_AI_DATES_RECORDS_BY_COW_ID_SQL, true, createdCow.id) as InjectionInfoAndAiDatesStructureInDB[];
  return {
    id: createdCow.id,
    name: createdCow.name,
    breed: createdCow.breed,
    bullName: createdCow.bull_name,
    injectionInfoAndAiDates:  newInjectionInfoAndAiDates,
    createdAt: createdCow.date_and_time
  };
}




async function getAllCows(): Promise<Cow[]> {
  let cows = await sqlite3.select(queries.SELECT_ALL_COWS_RECORDS_SQL, true) as CowRecordStructureInDB[];
  const injectionInfoAndAiDates = await sqlite3.select(queries.SELECT_ALL_INJECTION_INFO_AND_AI_DATES_RECORDS_SQL, true);

}


export default {
  addNewCow,
  getAllCows
};
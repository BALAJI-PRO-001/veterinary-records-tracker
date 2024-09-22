import sqlite3 from "../db/sqlite3";
import queries from "../db/sqlite3/queries";
import { 
  NewCow, 
  Cow, 
  CowInDB, 
  InjectionInfoAndAiDates,
  InjectionInfoAndAiDatesInDB
} from "../utils/types";



function validateId(id: number, name: "Cow" | "User") {
  if (!id) {
    throw new Error(`${name} id is null or undefined.`)
  }
}


async function addNewCow(newCow: NewCow): Promise<Cow> {
  await sqlite3.insert(queries.INSERT_COW_RECORD_SQL, newCow.userId, newCow.name, newCow.breed, newCow.bullName);
  const createdCow = await sqlite3.select(queries.SELECT_LAST_COW_RECORD_SQL, false) as CowInDB;
  let newInjectionInfoAndAiDates = await addNewInjectionInfoAndAiDatesToCow(createdCow.id, newCow.injectionInfoAndAiDates) as InjectionInfoAndAiDates[];

  return {
    id: createdCow.id,
    name: createdCow.name,
    breed: createdCow.breed,
    bullName: createdCow.bull_name,
    injectionInfoAndAiDates:  newInjectionInfoAndAiDates,
    createdAt: createdCow.date_and_time
  };
}



async function addNewInjectionInfoAndAiDatesToCow(cowId: number, injectionInfoAndAiDates: InjectionInfoAndAiDates[]): Promise<InjectionInfoAndAiDates[]> {
  validateId(cowId, "Cow");
  for (let { name, cost, date } of injectionInfoAndAiDates) {
    await sqlite3.insert(queries.INSERT_INJECTION_INFO_AND_AI_DATES_RECORD_SQL, cowId, name, cost, date);
  }
  return await getInjectionInfoAndAiDatesByCowId(cowId);
}




async function getInjectionInfoAndAiDatesByCowId(cowId: number): Promise<InjectionInfoAndAiDates[]> {
  return await sqlite3.select(queries.SELECT_INJECTION_INFO_AND_AI_DATES_RECORDS_BY_COW_ID_SQL, true, cowId) as InjectionInfoAndAiDates[];
}



async function getAllCows(): Promise<Cow[]> {
  let cows = await sqlite3.select(queries.SELECT_ALL_COWS_RECORDS_SQL, true) as CowInDB[];
  const injectionInfoAndAiDates = await sqlite3.select(queries.SELECT_ALL_INJECTION_INFO_AND_AI_DATES_RECORDS_WITH_COW_ID_SQL, true) as InjectionInfoAndAiDatesInDB[];

  const cowRecords: Cow[] = [];
  for (let cow of cows) {
    const cowInjectionInfoAndAiDates: InjectionInfoAndAiDates[] = injectionInfoAndAiDates
      .filter(({cow_id}) => cow_id === cow.id)
      .map(({id, name, cost, date}) => {
          return {id, name, cost, date};
      });

    cowRecords.push({
      id: cow.id,
      userId: cow.user_id,
      name: cow.name,
      breed: cow.breed,
      bullName: cow.bull_name,
      injectionInfoAndAiDates: cowInjectionInfoAndAiDates,
      createdAt: cow.date_and_time
    });
  }

  return cowRecords;
}



export default {
  addNewCow,
  getAllCows,
};
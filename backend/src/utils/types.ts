export interface NewUser {
  name: string;
  phoneNumber: number;
  address: string;
}



export interface User {
  id: number;
  name: string;
  phoneNumber: number;
  address: string; 
  isCurrentUser: boolean;
  createdAt: string;
}



export interface UserToUpdate {
  id?: number;
  name?: string;
  phoneNumber?: number;
  address?: string; 
  isCurrentUser?: boolean;
  createdAt?: string;
}



export interface UserInDB {
  id: number;
  name: string;
  phone_number: number;
  address: string;
  is_current_user: number;
  date_and_time: string;
}



export interface NewCow {
  userId: number;
  name: string;
  breed: string;
  bullName: string;
  injectionInfoAndAiDates: InjectionInfoAndAiDates[];
}




export interface InjectionInfoAndAiDates {
  id: number;
  name: string;
  cost: number;
  date: string;
}



export interface InjectionInfoAndAiDatesToUpdate {
  id: number;
  name?: string;
  cost?: number;
  date?: string;
}



export interface InjectionInfoAndAiDatesInDB {
  id: number;
  cow_id: number;
  name: string;
  cost: number;
  date: string;
}



export interface Cow {
  id: number;
  userId?: number;
  name: string;
  breed: string ;
  bullName: string;
  injectionInfoAndAiDates: InjectionInfoAndAiDates[];
  createdAt: string;
}



export interface CowInDB {
  id: number;
  user_id: number;
  name: string;
  breed: string;
  bull_name: string;
  date_and_time: string;
}



export interface CowToUpdate {
  id: number;
  name?: string;
  breed?: string;
  bullName?: string;
  injectionInfoAndAiDates?: InjectionInfoAndAiDates[];
}



export interface NewRecord {
  user: NewUser;
  cows: NewCow[];
}



export interface Record {
  user: User;
  cows: Cow[];
  recordCreatedAt: string;
}



export interface RecordToUpdate {
  user?: UserToUpdate;
  cows?: CowToUpdate[];
}
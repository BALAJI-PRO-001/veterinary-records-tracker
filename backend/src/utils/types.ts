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



export interface UserDataToUpdate {
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
  injectionInfoAndAiDates: InjectionInfoAndAiDate[];
}




export interface InjectionInfoAndAiDate {
  id: number;
  name: string;
  cost: number;
  // price: number;
  // givenAmount: number;
  // pendingAmount: number;
  date: string;
}



export interface InjectionInfoAndAiDateDataToUpdate {
  id: number;
  name?: string;
  cost?: number;
  date?: string;
}





export interface InjectionInfoAndAiDateInDB {
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
  injectionInfoAndAiDates: InjectionInfoAndAiDate[];
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



export interface CowDataToUpdate {
  id: number;
  name?: string;
  breed?: string;
  bullName?: string;
  injectionInfoAndAiDates?: InjectionInfoAndAiDate[];
}


export interface UpdatedCow {
  id: number;
  name: string;
  breed: string;
  bullName: string;
  createdAt: string;
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


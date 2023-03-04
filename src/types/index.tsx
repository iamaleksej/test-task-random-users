export interface UsersState {
   data: IUser[] | [];
   loading: boolean;
   error: null | string;
   totalPage: number
   quantityUsers: string;
   nationality: string | null;
   gender: string | null;
   searchValue: string;
}

export interface IUser {
   name: { first: string, last: string };
   location: { city: string };
   email: string;
   dob: { date: string };
   picture: { thumbnail: string };
   gender: string;
   nat: string;
   phone: string;
}

export interface GetUsersState {
   numberPage: number;
   quantityUsers: string;
   nationality: string | null;
   gender: string | null;
   options: {};
}
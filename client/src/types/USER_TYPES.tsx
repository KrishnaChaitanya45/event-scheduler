import { Event_Type } from "./EVENT_TYPES";

//? Some of the types are imported from the types folder and these are the types that are used in the form
export type USER_TYPE = {
  email: string;
  password: string;
  name: string;
  id: string;
  events: Event_Type[];
  token: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Register_Type = {
  email: string;
  password: string;
  name: string;
};
export type Login_Type = {
  email: string;
  password: string;
};

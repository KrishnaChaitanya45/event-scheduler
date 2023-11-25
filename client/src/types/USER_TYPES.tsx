import { Event_Type } from "./EVENT_TYPES";

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

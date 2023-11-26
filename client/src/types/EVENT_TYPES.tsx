import { Dayjs } from "dayjs";
//? the Event_Type is the type of the event object
export type Event_Type = {
  id?: number;
  title: string;
  description: string;
  date?: Dayjs;
  userId?: number;
  label?: string;
  createdAt?: string;
  updatedAt?: string;
};

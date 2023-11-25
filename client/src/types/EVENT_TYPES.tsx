import { Dayjs } from "dayjs";

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

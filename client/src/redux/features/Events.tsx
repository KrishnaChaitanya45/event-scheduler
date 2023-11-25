import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMonth } from "../../utils/getDaysArray";
import moment from "moment";
import { Event_Type } from "../../types/EVENT_TYPES";
import dayjs, { Dayjs } from "dayjs";

type AuthState = {
  currentMonth: moment.Moment[][];
  currentMonthIdx: number;
  isEventModelOpen: { isOpen: boolean; date?: Dayjs; events?: Event_Type[] };
  events: Event_Type[];
  labelsSelected: string[];
};

const initialState = {
  currentMonth: getMonth(moment().month()),
  isEventModelOpen: { isOpen: false, date: dayjs(), events: [] },
  currentMonthIdx: moment().month(),
  events: [],
  labelsSelected: [],
} as AuthState;

export const Events = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentMonthIdx: (state, action: PayloadAction<number>) => {
      state.currentMonthIdx = action.payload;
    },
    setCurrentMonth: (state, action: PayloadAction<number>) => {
      state.currentMonth = getMonth(action.payload);
    },
    setEventModelOpen: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        date?: Dayjs;
        events?: Event_Type[];
      }>
    ) => {
      if (!action.payload.date) {
        state.isEventModelOpen.isOpen =
          action.payload.isOpen || !state.isEventModelOpen.isOpen;
      } else {
        state.isEventModelOpen = action.payload;
      }
    },
    setLabelsSelected: (state, action: PayloadAction<string>) => {
      const labelExists = state.labelsSelected.find(
        (label) => label == action.payload
      );
      if (labelExists) {
        state.labelsSelected = state.labelsSelected.filter(
          (label) => label != action.payload
        );
      } else {
        state.labelsSelected.push(action.payload);
      }
    },
    addLabel: (state, action: PayloadAction<string[]>) => {
      state.labelsSelected = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event_Type>) => {
      state.events.push(action.payload);
      action.payload.label && state.labelsSelected.push(action.payload.label);
    },
    updateEvent: (state, action: PayloadAction<Event_Type>) => {
      state.events = state.events.map((evt) =>
        evt.id == action.payload.id ? action.payload : evt
      );
    },
    removeEvent: (state, action: PayloadAction<Event_Type>) => {
      state.events = state.events.filter((evt) => evt.id != action.payload.id);
    },
    setEvents: (state, action: PayloadAction<Event_Type[]>) => {
      state.events = action.payload;
    },
  },
});

export const {
  setCurrentMonthIdx,
  setCurrentMonth,
  setLabelsSelected,
  setEventModelOpen,
  updateEvent,
  setEvents,
  addEvent,
  addLabel,
  removeEvent,
} = Events.actions;
export default Events.reducer;

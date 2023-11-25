import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth";
import EventsReducer from "./features/Events";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    events: EventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth";
import EventsReducer from "./features/Events";
//? Redux Toolkit is a package that helps simplify Redux development.
//? It includes utilities to simplify common use cases like store setup, creating reducers, etc

//? Store setup using Redux Toolkit
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

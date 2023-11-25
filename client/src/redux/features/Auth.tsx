import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_TYPE } from "../../types/USER_TYPES";

type AuthState = {
  auth: { user: USER_TYPE | null; accessToken: string };
  loginOrRegister: "login" | "register";
};

const initialState = {
  auth: {
    user: null,
    accessToken: "",
  },
  loginOrRegister: "register" as "login" | "register",
} as AuthState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: USER_TYPE | null; accessToken: string }>
    ) => {
      state.auth = action.payload;
    },
    setLoginOrRegister: (
      state,
      action: PayloadAction<"login" | "register">
    ) => {
      state.loginOrRegister = action.payload;
    },
  },
});

export const { setAuth, setLoginOrRegister } = auth.actions;
export default auth.reducer;

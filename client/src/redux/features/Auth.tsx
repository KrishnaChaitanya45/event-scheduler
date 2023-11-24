import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  auth: { user: any; accessToken: any } | {};
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
      action: PayloadAction<{ user: any; accessToken: string } | {}>
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

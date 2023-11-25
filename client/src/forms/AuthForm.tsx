import { useAppDispatch, AppSelector } from "../redux/hooks/TypeDeclaredHooks";
import { useContext, FormEvent, useRef } from "react";
import CustomForm from "./CustomForm";
import {
  LOGIN_CONSTANTS,
  REGISTER_CONSTANTS,
} from "../constants/AUTH_CONSTANTS";
import axios, { axiosPrivate } from "../api/axios";
import { setAuth } from "../redux/features/Auth";
export default function AuthForm() {
  const context = AppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const submitHandler = async (e: FormEvent<HTMLFormElement>, values: any) => {
    e.preventDefault();

    console.log("REACHED HERE", values);
    try {
      if (context.loginOrRegister === "register") {
        console.log("REACHED HERE");

        const { data } = await axiosPrivate.post("/auth/register", values);
        console.log("=== REGISTER DATA ===", data);

        dispatch(
          setAuth({
            user: data?.user,
            accessToken: data?.tokens.accessToken,
          })
        );
        return {
          data: data,
          error: false,
          type: context.loginOrRegister,
        };
      } else {
        try {
          const { data } = await axiosPrivate.post("/auth/login", values);
          if (!data) {
            throw new Error("Authentication Failed, Please try again");
          }
          console.log("=== LOGIN DATA ===", data);
          dispatch(
            setAuth({
              user: data?.user,
              accessToken: data?.tokens.accessToken,
            })
          );
          return {
            data: data,
            error: false,
            message: "Login Successful 🚀",
            type: context.loginOrRegister,
          };
        } catch (error) {
          console.log("ERROR", error);

          return { error: true };
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      return { error: true };
    }
  };
  return (
    <>
      <CustomForm
        initialValues={
          context.loginOrRegister === "register"
            ? REGISTER_CONSTANTS
            : LOGIN_CONSTANTS
        }
        //@ts-ignore
        submitHandler={submitHandler}
        type={context.loginOrRegister}
      />
    </>
  );
}

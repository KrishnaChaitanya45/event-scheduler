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
    //? we use the same submit handler for both register and login forms
    //? so to identify which form is being submitted we use the context
    e.preventDefault();

    try {
      //? If the user is registering
      if (context.loginOrRegister === "register") {
        const { data } = await axiosPrivate.post("/auth/register", values);

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
        //? If the user is logging in
        try {
          const { data } = await axiosPrivate.post("/auth/login", values);
          if (!data) {
            throw new Error("Authentication Failed, Please try again");
          }
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
          return { error: true };
        }
      }
    } catch (error) {
      //! these errors are handled by the CustomForm component
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

import InputElement from "../components/InputElement";
import useForm from "../hooks/useForm";
import { FormEvent, useRef } from "react";
import { Login_Type, Register_Type, USER_TYPE } from "../types/USER_TYPES";

import { useNavigate } from "react-router-dom";
import { Event_Type } from "../types/EVENT_TYPES";
type PropsType = {
  initialValues: Register_Type | Login_Type | Event_Type;
  type?: "register" | "login" | "event";
  submitHandler: (
    e: FormEvent<HTMLFormElement>,
    values: Register_Type | Login_Type
  ) => Promise<{
    data?: {
      user: USER_TYPE;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    } | null;
    error?: boolean;
    message?: string;
    type?: "register" | "login" | "event";
  }> | void;
};
export default function CustomForm({
  initialValues,
  type,
  submitHandler,
}: PropsType) {
  console.log(Object.keys(initialValues));
  const [values, handleChange, resetValue, isValid] = useForm(initialValues);
  const errorRef = useRef<any>();
  const router = useNavigate();

  return (
    <form
      className={`flex flex-col items-center justify-center gap-6 ${
        // @ts-ignore
        !initialValues?.label &&
        "absolute top-[50%] -translate-y-[30%] -translate-x-[-50%] right-[50%]"
      } min-w-[70vw] lg:min-w-[30vw] xl:min-w-fit `}
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(isValid(Object.keys(values)));
        if (!isValid(Object.keys(values)).error) {
          const data = await submitHandler(e, values);
          console.log("DATA", data);
          if (!data?.error) {
            errorRef.current.style.display = "block";
            errorRef.current.innerText =
              data?.type === "register"
                ? "Registered Successfully 🚀"
                : "Login Successful 🚀";
            errorRef.current.style.backgroundColor = "#4CAF50";
            setTimeout(() => {
              errorRef.current.style.display = "none";
              router("/");
            }, 2000);
          } else {
            errorRef.current.style.display = "block";
            errorRef.current.innerText =
              data?.message || "Authentication Failed 😥";
            errorRef.current.style.backgroundColor = "#F44336";
            setTimeout(() => {
              errorRef.current.style.display = "none";
            }, 3000);
          }
        } else {
          errorRef.current.style.display = "block";

          if (type == "event") {
            errorRef.current.innerText =
              isValid(Object.keys(values)).title ||
              isValid(Object.keys(values)).description;
            setTimeout(() => {
              errorRef.current.style.display = "none";
            }, 3000);
            return;
          }
          if (
            values.password.length < 1 ||
            (type === "register" && values.name.length < 1) ||
            values.email.length < 1
          ) {
            errorRef.current.innerText = "Please fill all the fields";
            setTimeout(() => {
              errorRef.current.style.display = "none";
            }, 3000);
            return;
          }
          console.log("REACHED TO THE ERROR HANDLER");
          errorRef.current.innerText =
            type === "register"
              ? isValid(Object.keys(values)).name ||
                isValid(Object.keys(values)).email ||
                isValid(Object.keys(values)).password
              : isValid(Object.keys(values)).email ||
                isValid(Object.keys(values)).password;

          ("Invalid Input");
          setTimeout(() => {
            errorRef.current.style.display = "none";
          }, 3000);
        }
      }}
    >
      <p
        className="bg-[#FF836D] w-[100%] text-center text-sm py-2 rounded-xl font-poppins hidden"
        ref={errorRef}
      ></p>
      {Object.keys(initialValues).map((keyName, i) => (
        <InputElement
          uniqueKey={i}
          name={keyName}
          key={i}
          isText={
            keyName !== "password" && keyName !== "date" && keyName !== "label"
          }
          isPassword={keyName === "password"}
          value={values[keyName]}
          resetValue={resetValue}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        className=" @apply shadow-[0px_12px_21px_4px_rgba(68,97,242,0.15)] bg-[#4461F2] w-[100%] py-2 rounded-xl font-abhaya_libre text-lg tracking-wide"
      >
        {" "}
        {type === "register"
          ? "Register 🚀"
          : type === "login"
          ? "Login 🔥"
          : "Submit"}{" "}
      </button>
    </form>
  );
}
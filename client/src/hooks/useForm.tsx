"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VALIDATION_CONSTANTS } from "../constants/AUTH_CONSTANTS";
import { Login_Type, Register_Type } from "../types/USER_TYPES";
import { AppSelector } from "../redux/hooks/TypeDeclaredHooks";
export default function useForm(initialValues: any) {
  //? the initial values look like this
  //? {
  //?   name: "",
  //?   email: "",
  //?   password: "",
  //? } for the register form they are values initialized to empty strings or some other defaults
  //? we use the object to store all the initial values at once and instead of using multiple states

  const [values, setValues] = useState(initialValues);
  const registerOrLogin = AppSelector((state) => state.auth.loginOrRegister);

  useEffect(() => {
    if (values.name === undefined) {
      //? to identify if the form is a register form or a login form ( bad practice 😅 , gotta figure out a better way of doing this.>!)
      setValues(initialValues);
    }
  }, [initialValues]);

  function handleChange(e: any, isSocial?: boolean) {
    //? the handleChange function is used to update the values of the form
    //? we use the name property of the input field to identify which value to update
    //? and the value property of the input field to update the value
    const { name, value } = e.target;
    if (isSocial) {
      const previousValues = JSON.parse(JSON.stringify(values));
      previousValues.socials[name] = value;
      setValues(previousValues);
    } else {
      setValues({ ...values, [name]: value });
    }
  }
  function resetValue(name: string) {
    //? pretty easy..!
    setValues({ ...values, [name]: "" });
  }
  function validateRegex(
    property:
      | "name"
      | "email"
      | "password"
      | "title"
      | "description"
      | "label"
      | "date"
  ) {
    //? the VALIDATION_CONSTANTS object that is imported from the constants folder is used here
    // @ts-ignore
    const regex = VALIDATION_CONSTANTS[property];
    return regex.test(values[property]);
  }
  function isValid() {
    let isValid: {
      name?: string;
      email?: string;
      error: boolean;
      password?: string;
    } = {
      error: false,
    };
    //? this function is used to generate the error messages for the form
    Object.keys(values).forEach((property) => {
      if (
        property != "date" &&
        property != "label" &&
        !validateRegex(
          property as "name" | "email" | "password" | "title" | "description"
        )
      ) {
        isValid =
          property === "password"
            ? {
                ...isValid,
                [property]: "Use a strong password",
                error: true,
              }
            : property === "name"
            ? registerOrLogin === "register"
              ? {
                  ...isValid,
                  [property]: "Invalid name",
                }
              : {
                  error: false,
                }
            : {
                ...isValid,
                [property]: `Invalid ${property}`,
                error: true,
              };
      }
      if (property === "date" && values.date === undefined) {
        isValid = {
          ...isValid,
          error: true,
        };
      }
    });

    return isValid;
  }
  console.log("VALUES INSIDE CUSTOM FORM", values);

  return [values, handleChange, resetValue, isValid];
}

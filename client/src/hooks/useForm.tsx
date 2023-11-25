"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VALIDATION_CONSTANTS } from "../constants/AUTH_CONSTANTS";
import { Login_Type, Register_Type } from "../types/USER_TYPES";
import { AppSelector } from "../redux/hooks/TypeDeclaredHooks";
export default function useForm(initialValues: any): [any, any, any, any] {
  const [values, setValues] = useState(initialValues);
  const registerOrLogin = AppSelector((state) => state.auth.loginOrRegister);

  useEffect(() => {
    if (values.name === undefined) {
      setValues(initialValues);
    }
  }, [initialValues]);

  function handleChange(e: any, isSocial?: boolean) {
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

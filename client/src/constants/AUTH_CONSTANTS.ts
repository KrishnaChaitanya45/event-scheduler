//? constants for the custom form
export const REGISTER_CONSTANTS = {
  email: "",
  password: "",
  name: "",
};
export const LOGIN_CONSTANTS = {
  email: "",
  password: "",
};
//? some regex for validation of inputs, not all of them are used ofcourse but they are here for future use 😄
export const VALIDATION_CONSTANTS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
  title: /^[^0-9!@#$%^&*]{4,}$/,
  description: /^[^0-9!@#$%^&*]{4,}$/,
  label: /^[^0-9!@#$%^&*]{4,}$/,
  name: /^[^0-9!@#$%^&*]{4,}$/,
};

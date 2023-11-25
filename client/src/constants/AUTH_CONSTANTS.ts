export const REGISTER_CONSTANTS = {
  email: "",
  password: "",
  name: "",
};
export const VALIDATION_CONSTANTS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
  title: /^[^0-9!@#$%^&*]{4,}$/,
  description: /^[^0-9!@#$%^&*]{4,}$/,
  date: /^[^0-9!@#$%^&*]{4,}$/,
  label: /^[^0-9!@#$%^&*]{4,}$/,
  name: /^[^0-9!@#$%^&*]{4,}$/,
};
export const LOGIN_CONSTANTS = {
  email: "",
  password: "",
};
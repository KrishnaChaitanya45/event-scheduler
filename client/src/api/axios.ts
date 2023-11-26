import axios from "axios";

const baseURL = "https://tough-calf-bathing-suit.cyclic.app/";
export default axios.create({
  baseURL: baseURL,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

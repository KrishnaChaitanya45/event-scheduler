import axios from "axios";

//? use http://localhost:5000 for development
const baseURL = "https://tough-calf-bathing-suit.cyclic.app";
export default axios.create({
  baseURL: baseURL,
});

//? Custom axios instance for private routes which requires authentication ( something to do with the cookies )
export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

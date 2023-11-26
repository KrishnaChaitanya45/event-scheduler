import { useAppDispatch, AppSelector } from "../redux/hooks/TypeDeclaredHooks";
import axios from "../api/axios";

import { setAuth } from "../redux/features/Auth";
import { useNavigate } from "react-router-dom";
const useRefreshToken = () => {
  //? we use the refresh token from the cookie to get a new access token and refresh token
  //? and update the redux store with the new access token

  const auth = AppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });
      const prevAuth = { ...auth };
      prevAuth.accessToken = response.data.tokens.accessToken;
      prevAuth.user = response.data.user;
      dispatch(setAuth(prevAuth));
      return response.data.tokens.accessToken;
    } catch (error: any) {
      if (error.response.status === 401) {
        //? if the refresh token is expired then we logout the user ( no mercy 😈)
        //@ts-ignore
        if (auth?.accessToken == "") {
          dispatch(
            setAuth({
              accessToken: "",
              user: null,
            })
          );
          router("/auth");
        }
      }
    }
  };
  return refresh;
};

export default useRefreshToken;

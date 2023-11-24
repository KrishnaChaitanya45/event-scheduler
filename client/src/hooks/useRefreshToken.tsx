import { useAppDispatch, AppSelector } from "../redux/hooks/TypeDeclaredHooks";
import axios from "../api/axios";

import { setAuth } from "../redux/features/Auth";
import { useNavigate } from "react-router-dom";
const useRefreshToken = () => {
  const auth = AppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/token", {
        withCredentials: true,
      });
      console.log(response.data.accessToken);
      const prevAuth = { ...auth };
      prevAuth.accessToken = response.data.accessToken;
      prevAuth.user = response.data.user;
      dispatch(setAuth(prevAuth));
      return response.data.accessToken;
    } catch (error: any) {
      if (error.response.status === 400) {
        //TODO add a logout hook useLogout and send request to backend to remove the cookie for refresh token from the backend
        dispatch(setAuth({}));
        router("/login");
      }
    }
  };
  return refresh;
};

export default useRefreshToken;

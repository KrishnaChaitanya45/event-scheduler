import { Outlet, useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAppDispatch, AppSelector } from "../redux/hooks/TypeDeclaredHooks";
import { useState, useEffect } from "react";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const router = useNavigate();
  const auth = AppSelector((state) => state.auth.auth) as {
    user: any;
    accessToken: string;
  };
  //? Instead of storing the access token in the local storage which is vulnerable to XSS attacks,
  //? we store the access token in the redux store and the refresh token in the cookie ( which cannot be accessed by client side)
  //? and we use the refresh token to get a new access token when the access token is expired
  //? so before the user navigates to the home page we check if the access token is present in the redux store
  //? if not we get one from the refresh token and update the redux store
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const token = await refresh();
        if (token) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("REACHED HRERE", error);
        router("/auth");
      } finally {
        setIsLoading(false);
      }
    };
    if (auth.accessToken === "") {
      console.log("NO ACCESS TOKEN");
      verifyRefreshToken();
      return;
    } else {
      console.log("AUTH TOKEN FOUND", auth.accessToken);
      setIsLoading(false);
      router("/");
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="h-[100vh] w-full flex items-center justify-center">
          {" "}
          <h1 className="text-black font-semibold text-3xl ">Loading..</h1>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;

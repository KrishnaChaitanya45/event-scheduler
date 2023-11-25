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

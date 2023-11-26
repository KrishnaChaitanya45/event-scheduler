import { useEffect } from "react";

import useRefreshToken from "./useRefreshToken";
import { AppSelector } from "../redux/hooks/TypeDeclaredHooks";
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {
  //? During the development of this app, i faced a problem where the access token of the
  //? user was getting expired during a request to the backend which resulted in a 403 error
  //? so i wanted to refresh the token and retry the request again and the ui should not be affected
  //? so i used axios interceptors to handle this problem ( Chat GPT Again 😅 )
  const refresh = useRefreshToken();
  const { auth } = AppSelector((state) => state.auth);
  useEffect(() => {
    //? if no access token is present in the request header then we add the access token to the header
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (request) => {
        if (!request.headers.Authorization) {
          request.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    //? if the response status is 403 then we refresh the token and retry the request
    const resultInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest._retry) {
          prevRequest._retry = true;
          const accessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(prevRequest);
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(resultInterceptors);
      axiosPrivate.interceptors.request.eject(requestInterceptors);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;

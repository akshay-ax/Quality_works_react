import { FunctionComponent, useEffect, useState } from "react";
import createTokenProvider from "./TokenProvider";
import history from "../history";
import Cookies from "js-cookie";

export const CreateAuthProvider = () => {
  /* Implementation */

  const tokenProvider = createTokenProvider();

  const login: typeof tokenProvider.setToken = (newTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const logout = () => {
    tokenProvider.setToken({ accessToken: "" });
  };

  const authFetch = async (
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> => {
    const token = await tokenProvider.getToken();

    init = init || {};

    // init.body = {

    // }

    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    };
    init.credentials = "include";

    return fetch(input, init);
  };

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged: boolean) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged] as [typeof isLogged];
  };

  return {
    useAuth,
    authFetch,
    login,
    logout,
  };
};

export const { useAuth, authFetch, login, logout } = CreateAuthProvider();

import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCookies } from "react-cookie";
import { firebaseApp } from './firebase/firebase'

// start initializing the context - empty object
export const AuthContext = React.createContext({});
const AuthTokenCookieName = "auth_token";
const AuthUserIDCookieName = "auth_user_id";


// to prep states before transfering to all componentns
export default function AuthProvider({ children }) {
  
  const auth = getAuth();

  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [isLoading] = useState(true);
  const [token, setToken] = useState(null);
  // const [authUser, setAuthUser] = useState(null);
  const [authUserID, setAuthUserID] = useState(null);

  useEffect(() => {
    if (cookies.auth_token) {
      setToken(cookies[AuthTokenCookieName]);
      setAuthUserID(cookies[AuthUserIDCookieName]);
    }
  }, [cookies]);

  const register = async (email, password) => {
    try {
      const registerResp = await createUserWithEmailAndPassword(auth, email, password);
      const tokenResp = await registerResp.user.getIdToken();
      setToken(tokenResp);
      // setCookie(AuthTokenCookieName, tokenResp, { path: "/", maxAge: 10800 });
    } catch (err) {
      setToken(null);
      removeCookie(AuthTokenCookieName);
      return false;
    }
    return true;
  };

  const login = async (email, password) => {
    try {
      const loginResp = await signInWithEmailAndPassword(auth, email, password);
      const userToken = await loginResp.user.getIdToken();

      console.log("userToken");
      console.log(userToken);

      setToken(userToken);
      setAuthUserID(loginResp.user.uid);
      // setAuthUser(loginResp.user.toJSON());
      setCookie(AuthTokenCookieName, userToken, { path: "/", maxAge: 10800 });
      setCookie(AuthUserIDCookieName, loginResp.user.uid);

      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    setToken(null);
    await removeCookie(AuthTokenCookieName);
    await removeCookie(AuthUserIDCookieName);
    signOut(auth);
  };

  return (
    // specify the value to expose outside
    <AuthContext.Provider
      value={{ login, logout, register, isLoading, token, authUserID }}
    >
      {children}
    </AuthContext.Provider>
  );
}

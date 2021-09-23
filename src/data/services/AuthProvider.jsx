import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously
} from "firebase/auth";
import { useCookies } from "react-cookie";

export const AuthContext = React.createContext({});
const AuthTokenCookieName = "auth_token";
const AuthUserIDCookieName = "auth_user_id";

export default function AuthProvider({ children }) {
  
  const auth = getAuth();

  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [token, setToken] = useState(null);
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
    } catch (err) {
      setToken(null);
      removeCookie(AuthTokenCookieName);
      return false;
    }
    return true;
  };
  
  const loginAsGuest = async () => {
    let guestUserId = ""
    try {
      const GuestAccessResp = await signInAnonymously(auth)
      console.log(GuestAccessResp.user)
      const userToken = await GuestAccessResp.user.getIdToken();

      console.log("GuestAccessResp.user.uid");
      guestUserId = GuestAccessResp.user.uid
      console.log(guestUserId);

      setAuthUserID(guestUserId);
      setToken(userToken);

      setCookie(AuthTokenCookieName, userToken, { path: "/", maxAge: 10800 });
      setCookie(AuthUserIDCookieName, guestUserId);
      return true
    }
    catch (err) {
      console.log(err)
      return false
    }
    finally {
      setAuthUserID(guestUserId)
    }
  }

  const login = async (email, password) => {
    try {
      const loginResp = await signInWithEmailAndPassword(auth, email, password);
      const userToken = await loginResp.user.getIdToken();

      setAuthUserID(loginResp.user.uid);
      setToken(userToken);
      
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
      value={{ login, logout, register, loginAsGuest, token, authUserID }}
    >
      {children}
    </AuthContext.Provider>
  );
}

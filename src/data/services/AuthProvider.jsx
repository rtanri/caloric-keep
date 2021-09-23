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
  }, [cookies, auth.authUserID]);

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
      const userToken = await GuestAccessResp.user.getIdToken();

      guestUserId = GuestAccessResp.user.uid
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
    let loginUserId = ""

    try {
      const loginResp = await signInWithEmailAndPassword(auth, email, password);
      const userToken = await loginResp.user.getIdToken();

      loginUserId = loginResp.user.uid
      setToken(userToken);
      
      // setAuthUser(loginResp.user.toJSON());
      setCookie(AuthTokenCookieName, userToken, { path: "/", maxAge: 10800 });
      setCookie(AuthUserIDCookieName, loginUserId);
      
      return true;
    } catch (err) {
      return false;
    } finally {
      setAuthUserID(loginUserId);
      return loginUserId
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

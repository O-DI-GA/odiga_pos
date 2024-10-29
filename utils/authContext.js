import React, { createContext, useState, useContext, useEffect } from "react";
import { getTokenFromStorage } from "./tokenUtils";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = await getTokenFromStorage();
      setIsLogged(!!token);
    };
    checkToken();
  }, []);
  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

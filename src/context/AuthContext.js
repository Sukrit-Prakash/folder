import React, { createContext, useState, useEffect } from 'react';
import { hasMasterPin, checkMasterPin,setMasterPin } from '../storage/vault';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isSetup, setIsSetup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    hasMasterPin().then(setIsSetup);
  }, []);
const setupPin = async pin => {
    await setMasterPin(pin);
    setIsSetup(true);
  };


  const login = async pin => {
    if (await checkMasterPin(pin)) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

   return (
    <AuthContext.Provider value={{
      isSetup, isLoggedIn,
      setupPin, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
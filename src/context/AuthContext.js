import React, { createContext, useState, useEffect } from 'react';
import { hasMasterPin, checkMasterPin, setMasterPin, selfDestruct } from '../storage/vault';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSetup, setIsSetup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const MAX_ATTEMPTS = 5;

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
      setIncorrectAttempts(0); // Reset attempts on successful login
      return true;
    }
    
    const newAttempts = incorrectAttempts + 1;
    setIncorrectAttempts(newAttempts);
    
    if (newAttempts >= MAX_ATTEMPTS) {
      await selfDestruct();
      setIsSetup(false); // Reset setup state to force PIN setup again
      setIncorrectAttempts(0);
    }
    
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isSetup,
      isLoggedIn,
      setupPin,
      login,
      logout,
      incorrectAttempts,
      MAX_ATTEMPTS
    }}>
      {children}
    </AuthContext.Provider>
  );
}
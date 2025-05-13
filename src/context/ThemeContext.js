import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const LoadTheme = async()=>{
            try {
                const storedTheme = await AsyncStorage.getItem('user-theme');
                if (storedTheme) {
                    setTheme(storedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme from storage:', error);
            }
        }
        LoadTheme();
        },[])


   const toggle = async () => {
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
//     if (!theme) {
//       setTheme('light');
//     }
    await AsyncStorage.setItem('user-theme', newTheme);
  };

  const colors = {
    light: { bg: '#fff', text: '#000', card: '#f2f2f2', border: '#ccc' },
    dark: { bg: '#121212', text: '#e3e3e3', card: '#1e1e1e', border: '#333' }
  }[theme];

  return (
        <ThemeContext.Provider value={{ theme, colors, toggle }}>
            {children}
        </ThemeContext.Provider>
    );  
  
        }
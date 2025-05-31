import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { checkAndRequestPermissions, PERMISSIONS } from './utils/permissions';

export default function App() {
  enableScreens();

  useEffect(() => {
    const initializePermissions = async () => {
      try {
        // Request only necessary permissions
        const requiredPermissions = [
          PERMISSIONS.INTERNET,
          PERMISSIONS.NETWORK_STATE,
        ];
        
        await checkAndRequestPermissions(requiredPermissions);
      } catch (error) {
        console.warn('Error initializing permissions:', error);
      }
    };

    initializePermissions();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator/>
      </AuthProvider>
    </ThemeProvider>
  );
}

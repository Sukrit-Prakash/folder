import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { checkAndRequestPermissions, PERMISSIONS } from './utils/permissions';

// Enable screens for better performance
enableScreens();

// Error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Something went wrong</Text>
          <Text style={{ color: 'red' }}>{this.state.error?.toString()}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app...');
        // Request only necessary permissions
        const requiredPermissions = [
          PERMISSIONS.INTERNET,
          PERMISSIONS.NETWORK_STATE,
        ];
        
        console.log('Requesting permissions...');
        const results = await checkAndRequestPermissions(requiredPermissions);
        console.log('Permission results:', results);

        // Check if all required permissions are granted
        const allGranted = Object.values(results).every(granted => granted);
        if (!allGranted) {
          console.warn('Some permissions were not granted:', results);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setInitError(error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Initializing app...</Text>
      </View>
    );
  }

  if (initError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Failed to initialize app</Text>
        <Text style={{ color: 'red' }}>{initError.toString()}</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator/>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

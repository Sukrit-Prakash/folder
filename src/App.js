import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';


// import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
// import AppNavigator from './navigation/AppNavigator';
import AppNavigator from './navigation/AppNavigator';
import HomeScreen from './screens/Vault/Homescreen';
export default function App() {
  enableScreens();
  return (
    // <ThemeProvider>
    //   <AuthProvider>
        // <AppNavigator/>
        <ThemeProvider>
          <AuthProvider>
        {/* <HomeScreen/> */}
        <AppNavigator/>
          </AuthProvider>
        </ThemeProvider>
    //   </AuthProvider>
    // </ThemeProvider>
  );
}

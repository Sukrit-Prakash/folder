import React, { useContext,useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { View, FlatList, TextInput, StyleSheet,TouchableOpacity } from 'react-native';

import HomeScreen from '../screens/Vault/Homescreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SetupPinScreen from '../screens/Auth/SetupPinScreen';
import PasswordListScreen from '../screens/Vault/PasswordListScreen';
import NoteListScreen from '../screens/Vault/NoteListScreen';
import AddPasswordScreen from '../screens/Vault/AddPasswordScreen';
import AddNoteScreen from '../screens/Vault/AddNoteScreen';
import ViewEntryScreen from '../screens/Vault/ViewEntryScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function VaultStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Passwords" component={PasswordListScreen} >
                <TouchableOpacity>
            <MaterialCommunityIcons name="home" size={28} color="#ff4444" />
            </TouchableOpacity>
            </Tab.Screen>
            <Tab.Screen name="Notes" component={NoteListScreen} />
        </Tab.Navigator>
    );
}


export default function AppNavigator(){
    const { isSetup, isLoggedIn } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    if (isSetup === null) return null; // still loading
    
//     useEffect(() => {
//   if (isSetup) {
//     navigation.navigate('Login');
//   }
// }, [isSetup]);

    return(
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
           <Stack.Navigator screenOptions={{headerShown: false}}>
           {!isSetup ? (
                <Stack.Screen name="Setup" component={SetupPinScreen} />
            ) : !isLoggedIn ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Vault" component={VaultStack} />
                    <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
                    <Stack.Screen name="AddNote" component={AddNoteScreen} />
                    <Stack.Screen name="ViewEntry" component={ViewEntryScreen} />
                </>
           )}
        </Stack.Navigator>
        </NavigationContainer>
    )

}
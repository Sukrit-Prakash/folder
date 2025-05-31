import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/Vault/Homescreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SetupPinScreen from '../screens/Auth/SetupPinScreen';
import PasswordListScreen from '../screens/Vault/PasswordListScreen';
import NoteListScreen from '../screens/Vault/NoteListScreen';
import AddPasswordScreen from '../screens/Vault/AddPasswordScreen';
import AddNoteScreen from '../screens/Vault/AddNoteScreen';
import ViewEntryScreen from '../screens/Vault/ViewEntryScreen';
import ActivityLogScreen from '../screens/Vault/ActivityLogScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SecuritySettings from '../screens/Settings/SecuritySettings';
import AboutApp from '../screens/Settings/AboutApp';
import PrivacyPolicy from '../components/PrivacyPolicy';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function VaultStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Passwords"
                component={PasswordListScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="lock" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notes"
                component={NoteListScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="note-text" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cog" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { isSetup, isLoggedIn } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    
    if (isSetup === null) return null; // still loading

    return (
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
                        <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
                        <Stack.Screen 
                            name="PrivacyPolicy" 
                            component={PrivacyPolicy}
                            options={{
                                headerShown: true,
                                title: 'Privacy Policy',
                                headerStyle: {
                                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                                },
                                headerTintColor: theme === 'dark' ? '#fff' : '#000',
                            }}
                        />
                        <Stack.Screen 
                            name="SecuritySettings" 
                            component={SecuritySettings}
                            options={{
                                headerShown: true,
                                title: 'Security Settings',
                                headerStyle: {
                                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                                },
                                headerTintColor: theme === 'dark' ? '#fff' : '#000',
                            }}
                        />
                        <Stack.Screen 
                            name="AboutApp" 
                            component={AboutApp}
                            options={{
                                headerShown: true,
                                title: 'About App',
                                headerStyle: {
                                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                                },
                                headerTintColor: theme === 'dark' ? '#fff' : '#000',
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
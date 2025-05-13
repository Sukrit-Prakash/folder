import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
    const { toggle, theme, colors } = useContext(ThemeContext);
    const { logout } = useContext(AuthContext);

    const MenuButton = ({ icon, title, onPress, color = colors.text }) => (
        <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: colors.card, borderColor: colors.border }]} 
            onPress={onPress}
        >
            <MaterialCommunityIcons name={icon} size={28} color={color} style={styles.menuIcon} />
            <Text style={[styles.menuText, { color }]}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Password Manager</Text>
                <Text style={[styles.subtitle, { color: colors.text }]}>Secure your credentials</Text>
            </View>

            <View style={styles.menuGrid}>
                <MenuButton 
                    icon="key-plus" 
                    title="Add Password" 
                    onPress={() => navigation.navigate('AddPassword')}
                />
                <MenuButton 
                    icon="note-plus" 
                    title="Add Note" 
                    onPress={() => navigation.navigate('AddNote')}
                />
                <MenuButton 
                    icon="safe" 
                    title="Go to Vault" 
                    onPress={() => navigation.navigate('Vault')}
                />
                <MenuButton 
                    icon={theme === 'light' ? 'weather-night' : 'weather-sunny'} 
                    title={`${theme === 'light' ? 'Dark' : 'Light'} Mode`} 
                    onPress={toggle}
                />
                <MenuButton 
                    icon="logout" 
                    title="Logout" 
                    onPress={logout}
                    color="#ff4444"
                />
            </View>

            <View style={styles.statsContainer}>
                <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <MaterialCommunityIcons name="shield-lock" size={28} color={colors.text} />
                    <Text style={[styles.statNumber, { color: colors.text }]}>Secure</Text>
                    <Text style={[styles.statLabel, { color: colors.text }]}>Your data is encrypted</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.7,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'space-between',
    },
    menuButton: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        marginBottom: 12,
    },
    menuText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    statsContainer: {
        padding: 20,
    },
    statCard: {
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        opacity: 0.7,
    },
});
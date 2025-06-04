import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Platform } from 'react-native';
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
                    icon="history" 
                    title="Activity Log" 
                    onPress={() => navigation.navigate('ActivityLog')}
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

            

            <View style={[styles.infoSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.infoHeader}>
                    <MaterialCommunityIcons name="shield-check" size={24} color="#00ff00" />
                    <Text style={[styles.infoTitle, { color: colors.text }]}>Why Use This App?</Text>
                </View>
                <View style={styles.infoContent}>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="lock-check" size={20} color={colors.text} />
                        <Text style={[styles.infoText, { color: colors.text }]}>
                            Store passwords securely with end-to-end encryption
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="wifi-off" size={20} color={colors.text} />
                        <Text style={[styles.infoText, { color: colors.text }]}>
                            Works completely offline - no internet required
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="key-variant" size={20} color={colors.text} />
                        <Text style={[styles.infoText, { color: colors.text }]}>
                            Generate strong, unique passwords for each account
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons name="eye-off" size={20} color={colors.text} />
                        <Text style={[styles.infoText, { color: colors.text }]}>
                            Your data never leaves your device
                        </Text>
                    </View>
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
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
    infoSection: {
        margin: 20,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    infoContent: {
        gap: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoText: {
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
    },
    statsContainer: {
        padding: 20,
        marginTop: 'auto',
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
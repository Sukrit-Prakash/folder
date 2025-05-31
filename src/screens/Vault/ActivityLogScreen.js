import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';
import { getActivityLogs, clearActivityLogs } from '../../storage/activityLog';

export default function ActivityLogScreen({ navigation }) {
    const { theme, colors, toggle } = useContext(ThemeContext);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        loadLogs();
        const unsubscribe = navigation.addListener('focus', loadLogs);
        return unsubscribe;
    }, [navigation]);

    const loadLogs = async () => {
        const activityLogs = await getActivityLogs();
        setLogs(activityLogs);
    };

    const handleClearLogs = () => {
        Alert.alert(
            'Clear Activity Logs',
            'Are you sure you want to clear all activity logs?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        await clearActivityLogs();
                        setLogs([]);
                    }
                }
            ]
        );
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString();
    };

    const renderLogItem = ({ item }) => (
        <View style={[styles.logItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.logHeader}>
                <MaterialCommunityIcons 
                    name={item.type === 'password' ? 'lock' : 'note-text'} 
                    size={20} 
                    color={colors.text} 
                />
                <Text style={[styles.logTitle, { color: colors.text }]}>{item.title}</Text>
            </View>
            <Text style={[styles.logTime, { color: colors.text }]}>{formatDate(item.timestamp)}</Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={28} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Activity Log</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={toggle} style={styles.themeButton}>
                        <MaterialCommunityIcons 
                            name={theme === 'light' ? 'weather-night' : 'weather-sunny'} 
                            size={24} 
                            color={colors.text} 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClearLogs} style={styles.clearButton}>
                        <MaterialCommunityIcons name="delete" size={24} color="#ff4444" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={logs}
                keyExtractor={item => item.id}
                renderItem={renderLogItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: colors.text }]}>
                            No activity logs yet
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    backButton: {
        padding: 4,
    },
    themeButton: {
        padding: 8,
    },
    clearButton: {
        padding: 8,
        marginLeft: 8,
    },
    listContent: {
        padding: 16,
    },
    logItem: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
    },
    logHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    logTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
    logTime: {
        fontSize: 12,
        opacity: 0.7,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        opacity: 0.7,
    },
}); 
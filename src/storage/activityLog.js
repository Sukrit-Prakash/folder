import AsyncStorage from '@react-native-async-storage/async-storage';
import { encrypt, decrypt } from '../utils/encryption';

const ACTIVITY_LOG_KEY = 'ACTIVITY_LOGS';

export async function addActivityLog(entry) {
    try {
        const logs = await getActivityLogs();
        const newLog = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            entryId: entry.id,
            title: entry.title,
            type: entry.type
        };
        logs.unshift(newLog); // Add to beginning of array
        // Keep only last 100 logs
        const trimmedLogs = logs.slice(0, 100);
        await AsyncStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(trimmedLogs));
        return newLog;
    } catch (error) {
        console.error('Failed to add activity log:', error);
        throw error;
    }
}

export async function getActivityLogs() {
    try {
        const logs = await AsyncStorage.getItem(ACTIVITY_LOG_KEY);
        return logs ? JSON.parse(logs) : [];
    } catch (error) {
        console.error('Failed to get activity logs:', error);
        return [];
    }
}

export async function clearActivityLogs() {
    try {
        await AsyncStorage.removeItem(ACTIVITY_LOG_KEY);
    } catch (error) {
        console.error('Failed to clear activity logs:', error);
        throw error;
    }
} 
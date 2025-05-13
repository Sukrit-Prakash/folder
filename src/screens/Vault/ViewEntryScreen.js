import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import Clipboard from '@react-native-clipboard/clipboard';
import Button from '../../components/Button';
import { deleteEntry, updateEntry } from '../../storage/vault';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ViewEntryScreen({ route, navigation }) {
    const {entry} = route.params;
    
    const copy = text => {
        Clipboard.setString(text);
        Alert.alert('Copied to clipboard', text);
    }

    const remove = async () => {
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        await deleteEntry(entry.id);
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const renderField = (label, value, isCopyable = false, isLink = false) => (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            {isCopyable ? (
                <TouchableOpacity 
                    style={styles.copyableField} 
                    onPress={() => copy(value)}
                >
                    <Text style={[styles.value, isLink && styles.link]}>
                        {label === 'Password' ? '••••••••' : value}
                    </Text>
                    <Icon name="content-copy" size={20} color="#666" />
                </TouchableOpacity>
            ) : (
                <Text style={styles.value}>{value}</Text>
            )}
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Icon name="arrow-back" size={24} color="#111" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>{entry.title}</Text>
                        <Text style={styles.type}>{entry.type === 'password' ? 'Password Entry' : 'Note Entry'}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                {entry.type === 'password' ? (
                    <>
                        {renderField('Username', entry.username, true)}
                        {renderField('Password', entry.password, true)}
                        {entry.url && renderField('URL', entry.url, true, true)}
                    </>
                ) : (
                    renderField('Content', entry.content)
                )}
            </View>

            <View style={styles.actions}>
                <Button 
                    title="Delete Entry" 
                    onPress={remove} 
                    style={styles.deleteButton}
                    textStyle={styles.deleteButtonText}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerContent: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    type: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    content: {
        backgroundColor: '#fff',
        marginTop: 12,
        padding: 20,
        borderRadius: 8,
        marginHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 16,
        color: '#1a1a1a',
        lineHeight: 24,
    },
    copyableField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    link: {
        color: '#0066cc',
    },
    actions: {
        padding: 20,
        marginTop: 12,
    },
    deleteButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ff4444',
    },
    deleteButtonText: {
        color: '#ff4444',
    },
});
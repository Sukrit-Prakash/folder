import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Button from '../../components/Button';
import { deleteEntry, updateEntry } from '../../storage/vault';
import { addActivityLog } from '../../storage/activityLog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';

export default function ViewEntryScreen({ route, navigation }) {
    const { entry } = route.params;
    const { theme, colors, toggle } = useContext(ThemeContext);
    const [copyFeedback, setCopyFeedback] = useState('');
    
    useEffect(() => {
        // Log the activity when viewing an entry
        addActivityLog(entry);
    }, [entry]);

    const copy = async text => {
        try {
            if (!text) {
                return;
            }
            
            await Clipboard.setString(text);
            setCopyFeedback('Copied to clipboard!');
            
            setTimeout(() => {
                setCopyFeedback('');
            }, 2000);
        } catch (error) {
            setCopyFeedback('Failed to copy');
            
            setTimeout(() => {
                setCopyFeedback('');
            }, 2000);
        }
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

    const handleEdit = () => {
        if (entry.type === 'note') {
            navigation.navigate('AddNote', { entry });
        } else {
            navigation.navigate('AddPassword', { entry });
        }
    };

    const renderField = (label, value, isCopyable = false, isLink = false) => (
        <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            {isCopyable ? (
                <TouchableOpacity 
                    style={[styles.copyableField, { backgroundColor: colors.card, borderColor: colors.border }]} 
                    onPress={() => copy(value)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.value, isLink && styles.link, { color: colors.text }]}>
                        {label === 'Password' ? '••••••••' : value}
                    </Text>
                    <MaterialCommunityIcons name="content-copy" size={20} color={colors.text} />
                </TouchableOpacity>
            ) : (
                <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
            )}
        </View>
    );

    const renderRichContent = (content) => {
        // Convert HTML content to styled text
        const cleanContent = content
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
            .replace(/&amp;/g, '&') // Replace &amp; with &
            .replace(/&lt;/g, '<') // Replace &lt; with <
            .replace(/&gt;/g, '>') // Replace &gt; with >
            .replace(/&quot;/g, '"') // Replace &quot; with "
            .replace(/&#39;/g, "'"); // Replace &#39; with '

        return (
            <View style={[styles.richContentContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <ScrollView style={styles.richContentScroll}>
                    <Text style={[styles.richContentText, { color: colors.text }]}>{cleanContent}</Text>
                </ScrollView>
            </View>
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
            {copyFeedback ? (
                <View style={[styles.feedbackContainer, { backgroundColor: colors.card }]}>
                    <Text style={[styles.feedbackText, { color: colors.text }]}>{copyFeedback}</Text>
                </View>
            ) : null}
            <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <View style={styles.headerTop}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#ff4444" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={[styles.title, { color: colors.text }]}>{entry.title}</Text>
                        <Text style={[styles.type, { color: colors.text }]}>
                            {entry.type === 'password' ? 'Password Entry' : 'Note Entry'}
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={toggle} style={styles.themeButton}>
                            <MaterialCommunityIcons 
                                name={theme === 'light' ? 'weather-night' : 'weather-sunny'} 
                                size={24} 
                                color={colors.text} 
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                            <MaterialCommunityIcons name="pencil" size={24} color="#ff4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={[styles.content, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {entry.type === 'password' ? (
                    <>
                        {renderField('Username', entry.username, true)}
                        {renderField('Password', entry.password, true)}
                        {entry.url && renderField('URL', entry.url, true, true)}
                    </>
                ) : (
                    <View style={styles.noteContent}>
                        {entry.format === 'rich' ? (
                            renderRichContent(entry.content)
                        ) : (
                            renderField('Content', entry.content)
                        )}
                    </View>
                )}
            </View>

            <View style={styles.actions}>
                <Button 
                    title="Delete Entry" 
                    onPress={remove} 
                    style={[styles.deleteButton, { borderColor: '#ff4444' }]}
                    textStyle={styles.deleteButtonText}
                />
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
        borderBottomWidth: 1,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContent: {
        flex: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    themeButton: {
        padding: 4,
        marginRight: 12,
    },
    editButton: {
        padding: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
    },
    type: {
        fontSize: 14,
        textTransform: 'capitalize',
    },
    content: {
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
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 16,
        lineHeight: 24,
    },
    copyableField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
    },
    link: {
        color: '#0066cc',
    },
    actions: {
        padding: 20,
        marginTop: 12,
    },
    deleteButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
    },
    deleteButtonText: {
        color: '#ff4444',
    },
    noteContent: {
        flex: 1,
    },
    richContentContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 6,
        overflow: 'hidden',
    },
    richContentScroll: {
        flex: 1,
        padding: 16,
    },
    richContentText: {
        fontSize: 16,
        lineHeight: 24,
    },
    feedbackContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    feedbackText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert, TextInput, Share } from 'react-native';
import { getAllEntries, deleteEntry } from '../../storage/vault';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';
import { socialIcons } from '../../utils/socialIcons';

export default function PasswordListScreen({ navigation }) {
  const { theme, colors, toggle } = useContext(ThemeContext);
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEntries();
    const unsubscribe = navigation.addListener('focus', () => {
      loadEntries();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Filter entries based on search query
    if (searchQuery.trim() === '') {
      setFilteredEntries(entries);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = entries.filter(entry => 
        entry.title?.toLowerCase().includes(query) ||
        entry.username?.toLowerCase().includes(query) ||
        entry.url?.toLowerCase().includes(query)
      );
      setFilteredEntries(filtered);
    }
  }, [searchQuery, entries]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllEntries();
      // Remove duplicates by using a Map with ID as key
      const uniqueEntries = Array.from(
        new Map(
          data
            .filter(entry => entry.type === 'password')
            .map(entry => [entry.id, entry])
        ).values()
      );
      setEntries(uniqueEntries);
      setFilteredEntries(uniqueEntries);
    } catch (err) {
      setError('Failed to load passwords');
      Alert.alert(
        'Error',
        'Unable to load your passwords. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEntry(id);
              await loadEntries();
            } catch (err) {
              Alert.alert(
                'Error',
                'Unable to delete the entry. Please try again.',
                [{ text: 'OK' }]
              );
            }
          }
        }
      ]
    );
  };

  const handleShare = async (item) => {
    try {
      const shareContent = `Title: ${item.title}\nUsername: ${item.username}\nPassword: ${item.password}${item.url ? `\nURL: ${item.url}` : ''}`;
      
      await Share.share({
        message: shareContent,
        title: 'Share Password Details'
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to share the password details.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderItem = ({ item }) => {
    const icon = item.icon ? socialIcons.find(icon => icon.id === item.icon) : null;
    
    return (
      <TouchableOpacity 
        style={[styles.entry, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => navigation.navigate('ViewEntry', { entry: item })}
      >
        <View style={styles.entryContent}>
          <View style={styles.iconContainer}>
            {icon ? (
              <MaterialCommunityIcons 
                name={icon.icon} 
                size={32} 
                color={icon.color} 
              />
            ) : (
              <MaterialCommunityIcons 
                name="key" 
                size={32} 
                color={colors.text} 
              />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            {item.username && (
              <Text style={[styles.username, { color: colors.textSecondary }]} numberOfLines={1}>
                {item.username}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleShare(item)}
          >
            <MaterialCommunityIcons name="share-variant" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDelete(item.id)}
          >
            <MaterialCommunityIcons name="delete" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="lock-outline" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        {loading ? 'Loading passwords...' : 
         error ? 'Failed to load passwords' :
         'No passwords saved yet'}
      </Text>
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
            <MaterialCommunityIcons name="arrow-left" size={28} color="#ff4444" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Passwords</Text>
        </View>
        <TouchableOpacity onPress={toggle}>
          <MaterialCommunityIcons 
            name={theme === 'light' ? 'weather-night' : 'weather-sunny'} 
            size={28} 
            color={colors.text} 
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="magnify" size={24} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search passwords..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredEntries}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}-${item.timestamp || Date.now()}`}
        contentContainerStyle={[
          styles.list,
          filteredEntries.length === 0 && styles.emptyList
        ]}
        ListEmptyComponent={renderEmptyList}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />

      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: '#ff4444' }]}
        onPress={() => navigation.navigate('AddPassword')}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#fff" />
      </TouchableOpacity>
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
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  entryContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 8,
  },
});

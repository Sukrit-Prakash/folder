import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { getAllEntries } from '../../storage/vault';
import EntryCard from '../../components/EntryCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';

export default function NotesListScreen({ navigation }) {
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
        entry.content?.toLowerCase().includes(query)
      );
      setFilteredEntries(filtered);
    }
  }, [searchQuery, entries]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllEntries();
      const uniqueEntries = Array.from(
        new Map(
          data
            .filter(entry => entry.type === 'note')
            .map(entry => [entry.id, entry])
        ).values()
      );
      setEntries(uniqueEntries);
      setFilteredEntries(uniqueEntries);
    } catch (err) {
      setError('Failed to load notes');
      Alert.alert(
        'Error',
        'Unable to load your notes. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="note-text-outline" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        {loading ? 'Loading notes...' : 
         error ? 'Failed to load notes' :
         searchQuery ? 'No matching notes found' :
         'No notes saved yet'}
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Notes</Text>
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
          placeholder="Search notes..."
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
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EntryCard 
            entry={item} 
            onPress={e => navigation.navigate('ViewEntry', { entry: e })}
          />
        )}
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
        onPress={() => navigation.navigate('AddNote')}
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
}); 

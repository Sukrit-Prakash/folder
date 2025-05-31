import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getAllEntries } from '../../storage/vault';
import EntryCard from '../../components/EntryCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';

export default function NotesListScreen({ navigation }) {
  const { theme, colors, toggle } = useContext(ThemeContext);
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const all = (await getAllEntries()).filter(e => e.type === 'note');
      setEntries(all);
    });
  }, [navigation]);

  const filtered = entries.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    (e.content || '').toLowerCase().includes(query.toLowerCase())
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Notes</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggle} style={styles.themeButton}>
            <MaterialCommunityIcons 
              name={theme === 'light' ? 'weather-night' : 'weather-sunny'} 
              size={24} 
              color={colors.text} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color={colors.text} style={styles.searchIcon} />
          <TextInput
            placeholder="Search notes..."
            placeholderTextColor={colors.border}
            style={[styles.search, { 
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text
            }]}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <EntryCard 
              entry={item} 
              onPress={e => navigation.navigate('ViewEntry', { entry: e })}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  search: {
    flex: 1,
    padding: 12,
    paddingLeft: 44,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
}); 
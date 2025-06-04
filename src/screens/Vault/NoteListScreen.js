import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Alert, Text, Share } from 'react-native';
import { getAllEntries } from '../../storage/vault';
import EntryCard from '../../components/EntryCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';

export default function NoteListScreen({ navigation }) {
  const { theme, colors, toggle } = useContext(ThemeContext);
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');

  const handleShare = async () => {
    try {
      const all = (await getAllEntries()).filter(e => e.type === 'note');
      
      // Create a text version for sharing
      const textContent = all.map((item, idx) => {
        const content = item.format === 'rich' 
          ? item.content.replace(/<[^>]*>/g, '') // Remove HTML tags
          : item.content;
        return `${idx + 1}. ${item.title}\n${content}\n\n`;
      }).join('');

      await Share.share({
        message: textContent,
        title: 'My Notes'
      });
    } catch (err) {
      console.error('Share failed:', err);
      Alert.alert('Error', 'Failed to share. Please try again.');
    }
  };

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

        <View style={styles.exportContainer}>
          <TouchableOpacity 
            style={[styles.exportButton, { backgroundColor: colors.card }]} 
            onPress={handleShare}
          >
            <MaterialCommunityIcons name="share-variant" size={20} color={colors.text} />
            <Text style={[styles.exportText, { color: colors.text }]}>Share</Text>
          </TouchableOpacity>
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
  exportContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  exportText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 16,
  },
});

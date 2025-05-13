import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet ,TouchableOpacity} from 'react-native';
import { getAllEntries } from '../../storage/vault';
import EntryCard from '../../components/EntryCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Print } from 'react-native-print';

export default function PasswordListScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    navigation.addListener('focus', async () => {
      const all = (await getAllEntries()).filter(e=>e.type==='password');
      setEntries(all);
    });
  }, [navigation]);

  const filtered = entries.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    (e.username||'').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#ff4444" />
      </TouchableOpacity>
      <TextInput
        placeholder="Search..."
        style={styles.search}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EntryCard entry={item} onPress={e => navigation.navigate('ViewEntry', { entry: e })}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:10},
  search:{padding:8, borderWidth:1, borderRadius:6, marginBottom:10},
  backButton: {
    marginTop: 20,
    marginRight: 16,
    padding: 4,
  },
});

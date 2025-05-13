import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addEntry } from '../../storage/vault';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const save = async () => {
    if (!title || !content) {
      return Alert.alert('Error', 'Title and content required');
    }
    await addEntry({
      id: uuid.v4(),
      type: 'note',
      title, content
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#ff4444" />
      </TouchableOpacity>
      <Input placeholder="Title" value={title} onChangeText={setTitle}/>
      <Input
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ height: 120 }}
      />
      <Button title="Save" onPress={save}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20},
    backButton: {
        marginTop: 20,
        marginRight: 16,
        padding: 4,
    },
});

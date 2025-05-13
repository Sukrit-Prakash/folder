import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addEntry } from '../../storage/vault';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function AddPasswordScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const save = async () => {
    if (!title || !password) {
      return Alert.alert('Error', 'Title and password required');
    }
    await addEntry({
      id: uuid.v4(),
      type: 'password',
      title, username, password, url
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
             <MaterialCommunityIcons name="arrow-left" size={28} color="#ff4444" />
           </TouchableOpacity>
      <Input placeholder="Title" value={title} onChangeText={setTitle}/>
      <Input placeholder="Username / Email" value={username} onChangeText={setUsername}/>
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
      <Input placeholder="URL (optional)" value={url} onChangeText={setUrl}/>
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

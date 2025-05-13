import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const { login } = useContext(AuthContext);

  const handle = async () => {
    if (!(await login(pin))) {
      Alert.alert('Error', 'Incorrect PIN');
      // want to set up pin again
    }
    // else {
    //   navigation.navigate('Home');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Master PIN</Text>
      <Input
        placeholder="PIN"
        keyboardType="number-pad"
        secureTextEntry
        value={pin}
        onChangeText={setPin}
      />
      <Button title="Unlock" onPress={handle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:24, marginBottom:20, textAlign:'center' }
});

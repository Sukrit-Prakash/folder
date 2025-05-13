import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function SetupPinScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const { setupPin, isSetup } = useContext(AuthContext); // 👈 make sure isSetup is exposed

  const [pinSaved, setPinSaved] = useState(false);

  useEffect(() => {
    if (pinSaved && isSetup) {
      navigation.navigate('Login');
    }
  }, [isSetup, pinSaved]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Master PIN</Text>
      <Input
        placeholder="Enter 4-6 digit PIN"
        keyboardType="number-pad"
        secureTextEntry
        maxLength={6}
        value={pin}
        onChangeText={setPin}
      />
      <Button
        title="Save PIN"
        onPress={async () => {
          if (!pin || pin.length < 4) {
            Alert.alert('Error', 'PIN must be 4-6 digits');
            return;
          }
          
          try {
            // Ensure pin is a string
            const pinString = String(pin);
            await setupPin(pinString);
            // Add a small delay to ensure state updates are processed
            setTimeout(() => {
              navigation.navigate('Login');
            }, 100);
          } catch (error) {
            console.error('Error saving PIN:', error);
            Alert.alert('Error', 'Failed to save PIN. Please try again.');
          }
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20 },
  title: { fontSize:24, marginBottom:20, textAlign:'center' }
});

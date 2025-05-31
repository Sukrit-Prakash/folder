import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Animated, Dimensions } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function SetupPinScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const { setupPin, isSetup } = useContext(AuthContext);
  const [pinSaved, setPinSaved] = useState(false);
  const [securityAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (pinSaved && isSetup) {
      navigation.navigate('Login');
    }

    // Start security animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(securityAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(securityAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [isSetup, pinSaved]);

  const pulseStyle = {
    transform: [{
      scale: securityAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1]
      })
    }],
    opacity: securityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.securityContainer}>
        <Animated.View style={[styles.iconContainer, pulseStyle]}>
          <MaterialCommunityIcons name="shield-check" size={80} color="#00ff00" />
        </Animated.View>
        <Text style={styles.title}>INITIALIZE SECURITY</Text>
        <Text style={styles.subtitle}>Create Master PIN</Text>
        
        <View style={styles.securityInfo}>
          <MaterialCommunityIcons name="information" size={20} color="#666" />
          <Text style={styles.infoText}>PIN must be 4-6 digits</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter 4-6 digit PIN"
          keyboardType="number-pad"
          secureTextEntry
          maxLength={6}
          value={pin}
          onChangeText={setPin}
          style={styles.input}
        />
        <Button
          title="INITIALIZE"
          onPress={async () => {
            if (!pin || pin.length < 4) {
              Alert.alert('Error', 'PIN must be 4-6 digits');
              return;
            }
            
            try {
              const pinString = String(pin);
              await setupPin(pinString);
              setPinSaved(true);
              setTimeout(() => {
                navigation.navigate('Login');
              }, 100);
            } catch (error) {
              console.error('Error saving PIN:', error);
              Alert.alert('Error', 'Failed to save PIN. Please try again.');
            }
          }}
          style={styles.button}
        />
      </View>

      <View style={styles.securityFeatures}>
        <View style={styles.feature}>
          <MaterialCommunityIcons name="shield-lock" size={24} color="#00ff00" />
          <Text style={styles.featureText}>End-to-End Encryption</Text>
        </View>
        <View style={styles.feature}>
          <MaterialCommunityIcons name="key" size={24} color="#00ff00" />
          <Text style={styles.featureText}>Secure PIN Storage</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  securityContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconContainer: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff00',
    marginTop: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    letterSpacing: 1,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(102, 102, 102, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
  infoText: {
    color: '#666',
    marginLeft: 8,
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    backgroundColor: '#111',
    borderColor: '#00ff00',
    color: '#00ff00',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#00ff00',
    marginTop: 20,
  },
  securityFeatures: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  feature: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    padding: 15,
    borderRadius: 8,
    width: '45%',
  },
  featureText: {
    color: '#00ff00',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  }
});

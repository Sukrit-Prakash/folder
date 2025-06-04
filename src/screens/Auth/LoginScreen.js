import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Animated, Dimensions } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const { login, incorrectAttempts, MAX_ATTEMPTS } = useContext(AuthContext);
  const [pulseAnimation] = useState(new Animated.Value(0));
  const [rotateAnimation] = useState(new Animated.Value(0));
  const [securityLevel] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Start rotating animation
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Animate security level based on attempts
    Animated.timing(securityLevel, {
      toValue: incorrectAttempts / MAX_ATTEMPTS,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [incorrectAttempts]);

  const handle = async () => {
    if (!(await login(pin))) {
      const remainingAttempts = MAX_ATTEMPTS - incorrectAttempts - 1;
      if (remainingAttempts > 0) {
        Alert.alert(
          'Error',
          `Incorrect PIN. ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining.`
        );
      } else {
        Alert.alert(
          'Security Alert',
          'Too many incorrect attempts. The app will now self-destruct and clear all data for security.',
          [{ text: 'OK', onPress: () => navigation.navigate('Setup') }]
        );
      }
    }
  };

  const pulseStyle = {
    transform: [{
      scale: pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2]
      })
    }],
    opacity: pulseAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    })
  };

  const rotateStyle = {
    transform: [{
      rotate: rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    }]
  };

  const securityBarStyle = {
    width: securityLevel.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%']
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.securityContainer}>
        <View style={styles.shieldContainer}>
          <Animated.View style={[styles.rotatingRing, rotateStyle]}>
            <MaterialCommunityIcons name="shield-check" size={80} color="#00ff00" />
          </Animated.View>
          <Animated.View style={[styles.shield, pulseStyle]}>
            <MaterialCommunityIcons name="shield-lock" size={60} color="#00ff00" />
          </Animated.View>
        </View>
        <Text style={styles.title}>SECURE ACCESS</Text>
        <Text style={styles.subtitle}>Enter Master PIN</Text>

        <View style={styles.securityBarContainer}>
          <Animated.View style={[styles.securityBar, securityBarStyle]} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="PIN"
          keyboardType="number-pad"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
          style={styles.input}
        />
        <Button 
          title="UNLOCK" 
          onPress={handle}
          style={styles.button}
        />
      </View>

      {incorrectAttempts > 0 && (
        <View style={styles.warningContainer}>
          <MaterialCommunityIcons name="alert-circle" size={20} color="#ff4444" />
          <Text style={styles.warning}>
            {MAX_ATTEMPTS - incorrectAttempts} {MAX_ATTEMPTS - incorrectAttempts === 1 ? 'attempt' : 'attempts'} remaining
          </Text>
        </View>
      )}
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
  shieldContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shield: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotatingRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00ff00',
    justifyContent: 'center',
    alignItems: 'center',
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
  securityBarContainer: {
    width: width - 40,
    height: 4,
    backgroundColor: '#333',
    marginTop: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  securityBar: {
    height: '100%',
    backgroundColor: '#ff4444',
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
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
  warning: {
    color: '#ff4444',
    marginLeft: 8,
    fontSize: 14,
  }
});

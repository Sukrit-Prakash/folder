import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Modal, Alert } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SecuritySettings = () => {
  const { theme } = useContext(ThemeContext);
  const [autoLockTimeout, setAutoLockTimeout] = useState('1 minute');
  const [lockOnMinimize, setLockOnMinimize] = useState(true);
  const [passwordStrengthChecker, setPasswordStrengthChecker] = useState(true);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const timeoutOptions = [
    '30 seconds',
    '1 minute',
    '5 minutes',
    '15 minutes',
    '30 minutes',
    '1 hour',
    'Never'
  ];

  const handleChangePIN = () => {
    // Navigate to change PIN screen
    Alert.alert(
      'Change PIN',
      'This feature will be implemented in the next update.',
      [{ text: 'OK' }]
    );
  };

  const handleTimeoutSelect = (timeout) => {
    setAutoLockTimeout(timeout);
    setShowTimeoutModal(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5' }]}>
      {/* PIN Settings */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>PIN Settings</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleChangePIN}
        >
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="lock-reset" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Change PIN</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Auto-Lock Settings */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>Auto-Lock</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => setShowTimeoutModal(true)}
        >
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="clock-outline" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Auto-Lock Timeout</Text>
          </View>
          <Text style={styles.settingValue}>{autoLockTimeout}</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="lock-check" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Lock on App Minimize</Text>
          </View>
          <Switch
            value={lockOnMinimize}
            onValueChange={setLockOnMinimize}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Advanced Security */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>Advanced Security</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="shield-check" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Password Strength Checker</Text>
          </View>
          <Switch
            value={passwordStrengthChecker}
            onValueChange={setPasswordStrengthChecker}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Timeout Selection Modal */}
      <Modal
        visible={showTimeoutModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimeoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: theme === 'dark' ? '#fff' : '#333' }]}>
              Select Auto-Lock Timeout
            </Text>
            {timeoutOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.timeoutOption}
                onPress={() => handleTimeoutSelect(option)}
              >
                <Text style={[styles.timeoutText, { color: theme === 'dark' ? '#fff' : '#333' }]}>
                  {option}
                </Text>
                {option === autoLockTimeout && (
                  <MaterialCommunityIcons 
                    name="check" 
                    size={24} 
                    color={theme === 'dark' ? '#fff' : '#333'} 
                  />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowTimeoutModal(false)}
            >
              <Text style={[styles.cancelText, { color: theme === 'dark' ? '#fff' : '#333' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
  },
  settingArrow: {
    fontSize: 20,
    color: '#999',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  timeoutOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeoutText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecuritySettings; 
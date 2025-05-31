import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const navigateToPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const navigateToSecuritySettings = () => {
    navigation.navigate('SecuritySettings');
  };

  const navigateToAbout = () => {
    navigation.navigate('AboutApp');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5' }]}>
      {/* Security Section */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>Security</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={navigateToSecuritySettings}
        >
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="shield-lock" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Security Settings</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>About</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={navigateToPrivacyPolicy}
        >
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="shield-account" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Privacy Policy</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={navigateToAbout}
        >
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="information" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>About App</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      </View>
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
});

export default SettingsScreen; 
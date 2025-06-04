import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AboutApp = () => {
  const { theme } = useContext(ThemeContext);

  const openPrivacyPolicy = () => {
    // Navigate to privacy policy
  };

  const openTermsOfService = () => {
    // Navigate to terms of service
  };

  const openWebsite = () => {
    Linking.openURL('https://sukrit-prakash.github.io/my-app-policy/');
  };

  const openSupport = () => {
    Linking.openURL('mailto:sukritprakash2020@gmail.com');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5' }]}>
      {/* App Info */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <View style={styles.appInfo}>
          <MaterialCommunityIcons 
            name="shield-lock" 
            size={80} 
            color={theme === 'dark' ? '#fff' : '#333'} 
          />
          <Text style={[styles.appName, { color: theme === 'dark' ? '#fff' : '#333' }]}>
            Password Manager
          </Text>
          <Text style={[styles.version, { color: theme === 'dark' ? '#ccc' : '#666' }]}>
            Version 1.0.0
          </Text>
        </View>
      </View>

      {/* Links */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
       

        <TouchableOpacity 
          style={styles.linkItem}
          onPress={openTermsOfService}
        >
          <View style={styles.linkLeft}>
            <MaterialCommunityIcons name="file-document" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.linkText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Terms of Service</Text>
          </View>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkItem}
          onPress={openWebsite}
        >
          <View style={styles.linkLeft}>
            <MaterialCommunityIcons name="web" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.linkText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Visit Website</Text>
          </View>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkItem}
          onPress={openSupport}
        >
          <View style={styles.linkLeft}>
            <MaterialCommunityIcons name="email" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.linkText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Contact Support</Text>
          </View>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Credits */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.creditsTitle, { color: theme === 'dark' ? '#fff' : '#333' }]}>
          Credits
        </Text>
        <Text style={[styles.creditsText, { color: theme === 'dark' ? '#ccc' : '#666' }]}>
          Icons by MaterialCommunityIcons
        </Text>
        <Text style={[styles.creditsText, { color: theme === 'dark' ? '#ccc' : '#666' }]}>
          © 2024 Password Manager. All rights reserved.
        </Text>
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
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  version: {
    fontSize: 16,
    marginTop: 5,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    marginLeft: 15,
  },
  linkArrow: {
    fontSize: 20,
    color: '#999',
  },
  creditsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  creditsText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default AboutApp; 
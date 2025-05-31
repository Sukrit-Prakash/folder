import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect and store your passwords and related information locally on your device. 
          This data is encrypted and never leaves your device unless you explicitly choose to 
          export or backup your data.
        </Text>

        <Text style={styles.sectionTitle}>2. Data Storage</Text>
        <Text style={styles.text}>
          All your sensitive data is stored locally on your device using secure encryption. 
          We use industry-standard encryption methods to protect your information.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Usage</Text>
        <Text style={styles.text}>
          Your data is used solely for the purpose of providing the password management 
          functionality within the app. We do not share, sell, or transfer your data to 
          any third parties.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.text}>
          We implement appropriate security measures to protect your data, including:
          • Local encryption of all stored data
          • Secure authentication methods
          • Regular security updates
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.text}>
          You have full control over your data. You can:
          • Export your data
          • Delete your data
          • Change your security settings
        </Text>

        <Text style={styles.sectionTitle}>6. Updates to Privacy Policy</Text>
        <Text style={styles.text}>
          We may update this privacy policy from time to time. We will notify you of any 
          changes by posting the new privacy policy on this page.
        </Text>

        <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default PrivacyPolicy; 
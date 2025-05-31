import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BackupSettings = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5' }]}>
      {/* Backup Options */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>Backup Options</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="cloud-upload" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Create Backup</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="cloud-download" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Restore from Backup</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="cloud-sync" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Auto Backup</Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Backup History */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>Backup History</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="history" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>View Backup History</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="delete" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Clear Backup History</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Export Options */}
      <View style={[styles.section, { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#666' }]}>Export Options</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="file-export" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Export as CSV</Text>
          </View>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name="file-export" size={24} color={theme === 'dark' ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: theme === 'dark' ? '#fff' : '#333' }]}>Export as JSON</Text>
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

export default BackupSettings; 
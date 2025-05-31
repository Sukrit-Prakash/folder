import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import uuid from 'react-native-uuid';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addEntry } from '../../storage/vault';
import PasswordGenerator from '../../components/PasswordGenerator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';
import { socialIcons } from '../../utils/socialIcons';

export default function AddPasswordScreen({ navigation, route }) {
  const { theme, colors, toggle } = useContext(ThemeContext);
  const [title, setTitle] = useState(route.params?.entry?.title || '');
  const [username, setUsername] = useState(route.params?.entry?.username || '');
  const [password, setPassword] = useState(route.params?.entry?.password || '');
  const [url, setUrl] = useState(route.params?.entry?.url || '');
  const [useGenerator, setUseGenerator] = useState(false);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(route.params?.entry?.icon || null);

  const save = async () => {
    if(!password){
      return Alert.alert('Error', 'Password required');
    }
    await addEntry({
      id: route.params?.entry?.id || uuid.v4(),
      type: 'password',
      title: title || (selectedIcon ? socialIcons.find(icon => icon.id === selectedIcon)?.name : ''),
      username, 
      password, 
      url,
      icon: selectedIcon
    });
    navigation.goBack();
  };

  const renderIconSelector = () => (
    <Modal
      visible={showIconSelector}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowIconSelector(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.bg }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Platform</Text>
            <TouchableOpacity onPress={() => setShowIconSelector(false)}>
              <MaterialCommunityIcons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.iconGrid}>
            {socialIcons.map((icon) => (
              <TouchableOpacity
                key={icon.id}
                style={[
                  styles.iconItem,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  selectedIcon === icon.id && styles.selectedIcon
                ]}
                onPress={() => {
                  setSelectedIcon(icon.id);
                  setShowIconSelector(false);
                }}
              >
                <MaterialCommunityIcons name={icon.icon} size={32} color={icon.color} />
                <Text style={[styles.iconName, { color: colors.text }]}>{icon.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={28} color="#ff4444" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggle}>
          <MaterialCommunityIcons 
            name={theme === 'light' ? 'weather-night' : 'weather-sunny'} 
            size={28} 
            color={colors.text} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity 
          style={[styles.iconSelector, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowIconSelector(true)}
        >
          {selectedIcon ? (
            <View style={styles.selectedIconContainer}>
              <MaterialCommunityIcons 
                name={socialIcons.find(icon => icon.id === selectedIcon)?.icon} 
                size={32} 
                color={socialIcons.find(icon => icon.id === selectedIcon)?.color} 
              />
              <Text style={[styles.selectedIconText, { color: colors.text }]}>
                {socialIcons.find(icon => icon.id === selectedIcon)?.name}
              </Text>
            </View>
          ) : (
            <Text style={[styles.iconSelectorText, { color: colors.text }]}>
              Select Platform Icon
            </Text>
          )}
        </TouchableOpacity>

        <Input 
          placeholder="Title (optional)" 
          value={title} 
          onChangeText={setTitle}
          style={[styles.input, { color: colors.text }]}
        />
        <Input 
          placeholder="Username / Email" 
          value={username} 
          onChangeText={setUsername}
          style={[styles.input, { color: colors.text }]}
        />
        
        <View style={styles.passwordSection}>
          <View style={[styles.passwordToggle, { borderColor: colors.border }]}>
            <TouchableOpacity 
              style={[
                styles.toggleButton, 
                { backgroundColor: colors.card },
                !useGenerator && styles.activeToggle
              ]} 
              onPress={() => setUseGenerator(false)}
            >
              <Text style={[
                styles.toggleText, 
                { color: colors.text },
                !useGenerator && styles.activeToggleText
              ]}>
                Custom Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.toggleButton, 
                { backgroundColor: colors.card },
                useGenerator && styles.activeToggle
              ]} 
              onPress={() => setUseGenerator(true)}
            >
              <Text style={[
                styles.toggleText, 
                { color: colors.text },
                useGenerator && styles.activeToggleText
              ]}>
                Generate Password
              </Text>
            </TouchableOpacity>
          </View>

          {useGenerator ? (
            <PasswordGenerator onGenerate={setPassword} />
          ) : (
            <Input 
              placeholder="Password" 
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry
              style={[styles.input, { color: colors.text }]}
            />
          )}
        </View>

        <Input 
          placeholder="URL (optional)" 
          value={url} 
          onChangeText={setUrl}
          style={[styles.input, { color: colors.text }]}
        />
        <Button 
          title="Save" 
          onPress={save}
          style={styles.saveButton}
        />
      </ScrollView>
      {renderIconSelector()}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  input: {
    marginBottom: 16,
  },
  passwordSection: {
    marginBottom: 16,
  },
  passwordToggle: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#ff4444',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 20,
  },
  iconSelector: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconSelectorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedIconText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconGrid: {
    padding: 16,
  },
  iconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    gap: 12,
  },
  selectedIcon: {
    borderColor: '#ff4444',
    borderWidth: 2,
  },
  iconName: {
    fontSize: 16,
    fontWeight: '500',
  },
});

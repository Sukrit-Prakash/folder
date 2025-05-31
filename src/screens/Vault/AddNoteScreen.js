import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addEntry } from '../../storage/vault';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../context/ThemeContext';

export default function AddNoteScreen({ navigation }) {
  const { theme, colors, toggle } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const applyFormat = (format) => {
    switch (format) {
      case 'bold':
        setIsBold(!isBold);
        break;
      case 'italic':
        setIsItalic(!isItalic);
        break;
      case 'underline':
        setIsUnderline(!isUnderline);
        break;
    }
  };

  const save = async () => {
    if (!title || !content) {
      return Alert.alert('Error', 'Title and content required');
    }
    await addEntry({
      id: uuid.v4(),
      type: 'note',
      title,
      content,
      format: 'plain'
    });
    navigation.goBack();
  };

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
          <TouchableOpacity style={styles.saveButton} onPress={save}>
            <MaterialCommunityIcons name="content-save" size={28} color="#ff4444" />
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
        <Input 
          placeholder="Title" 
          value={title} 
          onChangeText={setTitle}
          style={[styles.titleInput, { color: colors.text }]}
        />

        <View style={[styles.formattingToolbar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity 
            style={[styles.formatButton, { backgroundColor: colors.bg }, isBold && styles.activeFormatButton]} 
            onPress={() => applyFormat('bold')}
          >
            <MaterialCommunityIcons name="format-bold" size={24} color={isBold ? "#ff4444" : colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.formatButton, { backgroundColor: colors.bg }, isItalic && styles.activeFormatButton]} 
            onPress={() => applyFormat('italic')}
          >
            <MaterialCommunityIcons name="format-italic" size={24} color={isItalic ? "#ff4444" : colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.formatButton, { backgroundColor: colors.bg }, isUnderline && styles.activeFormatButton]} 
            onPress={() => applyFormat('underline')}
          >
            <MaterialCommunityIcons name="format-underline" size={24} color={isUnderline ? "#ff4444" : colors.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.editorContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TextInput
            multiline
            value={content}
            onChangeText={setContent}
            placeholder="Start writing your note..."
            placeholderTextColor={colors.border}
            style={[
              styles.editor, 
              { color: colors.text },
              isBold && styles.boldText,
              isItalic && styles.italicText,
              isUnderline && styles.underlineText
            ]}
            textAlignVertical="top"
            autoCapitalize="sentences"
          />
        </View>
      </ScrollView>
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
  saveButton: {
    padding: 4,
  },
  titleInput: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '600',
  },
  formattingToolbar: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  formatButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  activeFormatButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editorContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editor: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 300,
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

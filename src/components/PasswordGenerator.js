// components/PasswordGenerator.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const substitutions = { a: '@', s: '$', o: '0', e: '3', i: '1' };
const symbols = '!@#$%&*';

const transform = (word) => {
  return word
    .split('')
    .map(char => substitutions[char.toLowerCase()] || char)
    .join('');
};

const generatePassword = (root) => {
  const transformed = transform(root);
  const capitalized = transformed.charAt(0).toUpperCase() + transformed.slice(1);
  const suffix = Math.floor(Math.random() * 1000) + symbols[Math.floor(Math.random() * symbols.length)];
  return capitalized + suffix;
};

export default function PasswordGenerator({ onGenerate }) {
  const [rootWord, setRootWord] = useState('');

  const handleGenerate = () => {
    const pwd = generatePassword(rootWord);
    onGenerate(pwd);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Generate from Root Word</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a root word"
        value={rootWord}
        onChangeText={setRootWord}
      />
      <Button title="Generate Password" onPress={handleGenerate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 6, marginBottom: 10,
  },
});

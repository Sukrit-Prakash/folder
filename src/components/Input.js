import React, { useContext } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Input({ style, ...props }) {
  const { colors } = useContext(ThemeContext);
  return (
    <TextInput
      style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }, style]}
      placeholderTextColor={colors.border}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 8,
  },
});

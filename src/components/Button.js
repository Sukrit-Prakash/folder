import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function Button({ title, onPress, style }) {
  const { colors } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: colors.card, borderColor: colors.border }, style]}
      onPress={onPress}
    >
      <Text style={{ color: colors.text, fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 8,
  },
});

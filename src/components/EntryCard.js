import React, { useContext } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function EntryCard({ entry, onPress }) {
  const { colors } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => onPress(entry)} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}>{entry.title}</Text>
      <Text style={{ color: colors.text, fontSize: 14 }}>{entry.username || entry.category}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
  },
});

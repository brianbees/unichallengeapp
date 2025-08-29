import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

export default function SaveMatchBar({ onSave }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: insets.bottom + 8, padding: 12, backgroundColor: '#111' }}>
      <TouchableOpacity onPress={onSave} style={{ backgroundColor: COLORS.accent, padding: 14, borderRadius: 999 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Save Match</Text>
      </TouchableOpacity>
    </View>
  );
}
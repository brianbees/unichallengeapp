import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

export default function ScoreColumn({ team, score, onScore }) {
  return (
    <View style={{ flex: 1, margin: 8, padding: 12, backgroundColor: '#333', borderRadius: 16 }}>
      <Text style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>{team}</Text>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.accent, marginBottom: 12 }}>{score}</Text>
      <TouchableOpacity onPress={() => onScore(10)} style={{ backgroundColor: COLORS.accent, padding: 8, borderRadius: 12, marginBottom: 6 }}>
        <Text>+10 Starter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onScore(5)} style={{ backgroundColor: COLORS.accent, padding: 8, borderRadius: 12, marginBottom: 6 }}>
        <Text>+5 Bonus</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onScore(-5)} style={{ backgroundColor: '#f55', padding: 8, borderRadius: 12 }}>
        <Text>-5 Penalty</Text>
      </TouchableOpacity>
    </View>
  );
}
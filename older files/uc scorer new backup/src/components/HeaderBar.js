import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HeaderBar({ onUndo, onReset }) {
  return (
    <LinearGradient colors={['#222', '#111']} style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>University Challenge</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={onUndo}><Text style={{ color: '#fff', marginRight: 12 }}>Undo</Text></TouchableOpacity>
          <TouchableOpacity onPress={onReset}><Text style={{ color: '#fff' }}>Reset</Text></TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
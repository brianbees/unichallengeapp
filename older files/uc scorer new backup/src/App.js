import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ScoreScreen from './screens/ScoreScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScoreScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
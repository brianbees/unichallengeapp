import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import ScoreColumn from '../components/ScoreColumn';
import SaveMatchBar from '../components/SaveMatchBar';

export default function ScoreScreen() {
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });

  const handleScore = (team, delta) => {
    setScores(prev => ({ ...prev, [team]: prev[team] + delta }));
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar onUndo={() => {}} onReset={() => setScores({ A: 0, B: 0, C: 0, D: 0 })} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {Object.keys(scores).map(team => (
            <ScoreColumn key={team} team={`Team ${team}`} score={scores[team]} onScore={delta => handleScore(team, delta)} />
          ))}
        </View>
      </ScrollView>
      <SaveMatchBar onSave={() => console.log('Save match pressed')} />
    </View>
  );
}
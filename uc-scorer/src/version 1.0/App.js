import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { initDb, saveMatch, listMatches } from './db';
import { s, colors } from './styles';

export default function App() {
  // tabs: 'score' | 'events' | 'history'
  const [tab, setTab] = useState('score');

  const [teamA, setTeamA] = useState('Team A');
  const [teamB, setTeamB] = useState('Team B');
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [events, setEvents] = useState([]); // {t, team, type, delta}
  const [matches, setMatches] = useState([]);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initDb();
      setDbReady(true);
      const rows = await listMatches();
      setMatches(rows || []);
    })();
  }, []);

  const addEvent = (team, type, delta) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  playSound(); // ← plays for +10 and +5 alike
  const t = new Date().toISOString();
  setEvents(prev => [{ t, team, type, delta }, ...prev]);
  if (team === 'A') setScoreA(v => v + delta); else setScoreB(v => v + delta);
};



const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/sounds/applause.wav')
  );
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate(status => {
    if (status.didJustFinish) sound.unloadAsync();
  });
};

  

const undo = () => {
    Haptics.selectionAsync();
    setEvents(prev => {
      if (prev.length === 0) return prev;
      const [last, ...rest] = prev;
      if (last.team === 'A') setScoreA(v => v - last.delta); else setScoreB(v => v - last.delta);
      return rest;
    });
  };

  const reset = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert('Reset match', 'Clear scores and events?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => { setScoreA(0); setScoreB(0); setEvents([]); } }
    ]);
  };

  const saveCurrent = async () => {
  Haptics.selectionAsync();
  if (!dbReady) return;
  if (!teamA.trim() || !teamB.trim()) {
    Alert.alert('Team names', 'Please enter team names before saving.');
    return;
  }
  await saveMatch({ teamA, teamB, scoreA, scoreB, events: [...events].reverse() });
  const rows = await listMatches();
  setMatches(rows || []);
  Alert.alert('Saved', 'Match saved to local database.');

  // Reset state after saving
  setScoreA(0);
  setScoreB(0);
  setEvents([]);

  setTab('history');
};


  // Shared pill button
  const PillBtn = ({ title, icon, onPress, filled, style }) => (
    <TouchableOpacity
      onPress={() => { onPress && onPress(); }}
      activeOpacity={0.85}
      style={[s.button, filled ? s.pillFilled : s.pillOutline, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }, style]}
    >
      <Ionicons name={icon} size={18} color={filled ? '#111' : colors.text} />
      <Text style={[s.buttonText, { marginLeft: 8 }, filled && s.pillFilledText]} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  // Top tabs that sit UNDER the header bar
  const TopTabs = () => (
    <View style={[s.row, s.spaceBetween, s.mb16]}>
      <TouchableOpacity
        onPress={() => setTab('score')}
        style={[
          s.button,
          tab === 'score' ? s.pillFilled : s.pillOutline,
          { flex: 1, marginRight: 8, flexDirection: 'row', justifyContent: 'center' }
        ]}
      >
        <Ionicons name="grid-outline" size={18} color={tab === 'score' ? '#111' : colors.text} />
        <Text style={[s.buttonText, { marginLeft: 8 }, tab === 'score' && s.pillFilledText]}>Score</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setTab('events')}
        style={[
          s.button,
          tab === 'events' ? s.pillFilled : s.pillOutline,
          { flex: 1, marginHorizontal: 4, flexDirection: 'row', justifyContent: 'center' }
        ]}
      >
        <Ionicons name="list-outline" size={18} color={tab === 'events' ? '#111' : colors.text} />
        <Text style={[s.buttonText, { marginLeft: 8 }, tab === 'events' && s.pillFilledText]}>Events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setTab('history')}
        style={[
          s.button,
          tab === 'history' ? s.pillFilled : s.pillOutline,
          { flex: 1, marginLeft: 8, flexDirection: 'row', justifyContent: 'center' }
        ]}
      >
        <Ionicons name="book-outline" size={18} color={tab === 'history' ? '#111' : colors.text} />
        <Text style={[s.buttonText, { marginLeft: 8 }, tab === 'history' && s.pillFilledText]}>History</Text>
      </TouchableOpacity>
    </View>
  );

  // A single header bar component
  const HeaderBar = ({ title, subtitle }) => (
    <LinearGradient colors={['#103c8f', '#1f6feb']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.headerBar}>
      <Text style={s.headerTitle}>{title}</Text>
      <Text style={s.headerSub}>{subtitle}</Text>
    </LinearGradient>
  );

  // Score column (no duplicated team name tile)
  const ScoreColumn = ({ teamKey, name, setName, score, onStarter, onBonus }) => (
  <View style={[s.card, { flex: 1, marginHorizontal: 6, borderColor: teamKey === 'A' ? colors.teamA : colors.teamB }]}>
    <View style={[s.playerNameBar, s.mb12]}>
  <TextInput
    value={name}
    onChangeText={setName}
    placeholder={`Team ${teamKey}`}
    placeholderTextColor={colors.muted}
    style={s.playerNameText}
  />
</View>

    {/* Big score */}
    <View style={[s.scoreTile, s.mb12]}>
      <Text style={s.small}>Score</Text>
      <Text style={s.bigScore}>{score}</Text>
    </View>

    {/* Vertical scoring buttons */}
    <View style={[s.mt12]}>
      <PillBtn title="+10 Starter" icon="add-circle" onPress={onStarter} style={{ marginBottom: 8 }} />
      <PillBtn title="+5 Bonus" icon="add" onPress={onBonus} />
    </View>
  </View>
);


  // SCREENS — each starts with HeaderBar, THEN TopTabs, then content
  const ScoreScreen = () => (
    <View>
      <HeaderBar title="University Challenge" subtitle="Your starter for 10" />
      <TopTabs />

      {/* Toolbar */}
     <View style={[s.row, s.spaceBetween, s.mb12]}>
  <View style={s.row}>
    <PillBtn title="Undo" icon="arrow-undo" onPress={undo} />
    <PillBtn title="Reset" icon="refresh" onPress={reset} style={{ marginLeft: 8 }} />
  </View>
</View>

      {/* Two team cards */}
      <View style={[s.row]}>
        <ScoreColumn
          teamKey="A"
          name={teamA}
          setName={setTeamA}
          score={scoreA}
          onStarter={() => addEvent('A', 'starter', 10)}
          onBonus={() => addEvent('A', 'bonus', 5)}
          onPenalty={() => addEvent('A', 'penalty', -5)}
        />
        <ScoreColumn
          teamKey="B"
          name={teamB}
          setName={setTeamB}
          score={scoreB}
          onStarter={() => addEvent('B', 'starter', 10)}
          onBonus={() => addEvent('B', 'bonus', 5)}
          onPenalty={() => addEvent('B', 'penalty', -5)}
        />
      </View>

      {/* Save bar */}
      <View style={[s.card, s.mt16, s.row, s.spaceBetween]}>
        <TouchableOpacity
          onPress={saveCurrent}
          activeOpacity={0.85}
          style={[s.button, s.pillFilled, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
        >
          <Ionicons name="save" size={18} color="#111" />
          <Text style={[s.buttonText, s.pillFilledText, { marginLeft: 8 }]}>Save match</Text>
        </TouchableOpacity>

        <Text style={s.small}>
          {teamA}: {scoreA}  •  {teamB}: {scoreB}
        </Text>
      </View>
    </View>
  );

  const EventsScreen = () => (
    <View>
      <HeaderBar title="Recent events" subtitle="Live scoring log" />
      <TopTabs />

      <View style={[s.card]}>
        {events.length === 0 ? (
          <Text style={s.small}>No events yet.</Text>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(it, idx) => String(idx) + it.t}
            renderItem={({ item }) => (
              <View style={[s.row, s.spaceBetween, s.mb12]}>
                <Text style={s.text}>{new Date(item.t).toLocaleTimeString()}</Text>
                <Text
                  style={{
                    color:
                      item.delta > 0
                        ? colors.success
                        : item.delta < 0
                        ? colors.danger
                        : colors.text,
                    fontWeight: '800',
                  }}
                >
                  {(item.team === 'A' ? teamA : teamB) + ' — ' + item.type + ' '}
                  {item.delta > 0 ? `+${item.delta}` : item.delta}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );

  const HistoryScreen = () => (
    <View>
      <HeaderBar title="Saved matches" subtitle="Browse your score history" />
      <TopTabs />

      <View style={[s.card]}>
        {matches.length === 0 ? (
          <Text style={s.small}>No matches saved yet.</Text>
        ) : (
          <FlatList
            data={matches}
            keyExtractor={(it) => String(it.id)}
            renderItem={({ item }) => (
              <View style={[s.row, s.spaceBetween, s.mb12]}>
                <View>
                  <Text style={s.text}>{new Date(item.created_at).toLocaleString()}</Text>
                  <Text style={s.small}>{item.team_a} vs {item.team_b}</Text>
                </View>
                <Text style={[s.h2, { color: colors.yellow }]}>{item.score_a}–{item.score_b}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );

  return (
  <LinearGradient
    colors={['#5B0EEB', '#C92A8C']} // purple → magenta
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{ flex: 1 }}
  >
    <SafeAreaView style={[s.screen, { backgroundColor: 'transparent' }]}>
      <StatusBar style="light" />
      {tab === 'score' ? <ScoreScreen /> : tab === 'events' ? <EventsScreen /> : <HistoryScreen />}
    </SafeAreaView>
  </LinearGradient>
);

}

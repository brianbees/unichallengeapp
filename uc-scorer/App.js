import React, { useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DbProvider from '@/db/DbProvider';
import { useMatchesRepo } from '@/db/matches';
import { useScores } from '@/state/useScores';
import { COLORS } from '@/theme/colors';
import { SPACING, HIT_SLOP } from '@/theme/tokens';
import { SCORING_MODE } from '@/config';
import { showError } from '@/utils/errors';
import { styles } from './styles';

function ScoreScreen() {
  const [activeTab, setActiveTab] = useState('Score');
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const toolbarRef = useRef(null);
  const footerRef = useRef(null);
  const [headerH, setHeaderH] = useState(0);
  const [tabsH, setTabsH] = useState(0);
  const [toolbarH, setToolbarH] = useState(0);
  const [footerH, setFooterH] = useState(0);

  const { state, setTeamName, addScore, undo, resetAll, aggregate } = useScores();
  const { saveMatch } = useMatchesRepo();

  const topY = headerH + tabsH + toolbarH;
  const bottomY = footerH;

  async function onSave() {
    try {
      const payload = {
        teams: state.teams,
        scores: state.scores,
        events: state.events,
      };
      const res = await saveMatch(payload);
      if (res?.ok) {
        Alert.alert('Saved', 'Match saved successfully.');
        resetAll();
      }
    } catch (e) {
      showError('SAVE_FAILED');
    }
  }

  const saveLabel = useMemo(() => {
    if (SCORING_MODE === 'A_plus_C_vs_B_plus_D') {
      return `Save Match  •  ${aggregate.left}  vs  ${aggregate.right}`;
    }
    return `Save Match  •  ${state.scores.A}  vs  ${state.scores.B}`;
  }, [aggregate, state.scores]);

  const ScoreButtons = ({ team }) => (
    <View style={styles.buttonRow}>
      {[+10, +5, +1, -5, -1].map((delta) => (
        <TouchableOpacity
          key={delta}
          onPress={() => addScore(team, delta)}
          accessibilityRole="button"
          accessibilityLabel={`${delta > 0 ? 'Add' : 'Remove'} ${Math.abs(delta)} points to Team ${team}`}
          hitSlop={HIT_SLOP}
          style={styles.pillBtn}
        >
          <Text style={styles.pillBtnText}>{delta > 0 ? `+${delta}` : `${delta}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const TeamCard = ({ teamKey }) => (
    <View style={styles.teamCard}>
      <Text style={styles.teamTitle}>{state.teams[teamKey]}</Text>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreValue}>{state.scores[teamKey]}</Text>
        <TouchableOpacity
          onPress={() => setTeamName(teamKey, prompt(`Rename Team ${teamKey}`, state.teams[teamKey]) || state.teams[teamKey])}
          accessibilityRole="button"
          accessibilityLabel={`Rename Team ${teamKey}`}
          hitSlop={HIT_SLOP}
          style={styles.pillBtn}
        >
          <Text style={styles.pillBtnText}>Rename</Text>
        </TouchableOpacity>
      </View>
      <ScoreButtons team={teamKey} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={[COLORS.backgroundTop, COLORS.backgroundBottom]} style={styles.bg} />

      <View ref={headerRef} onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)} style={styles.headerWrap}>
        <View style={styles.headerLozenge}>
          <Text style={styles.headerText} accessibilityRole="header">University Challenge</Text>
        </View>
      </View>

      <View ref={tabsRef} onLayout={(e) => setTabsH(e.nativeEvent.layout.height)} style={styles.tabsRow}>
        {['Score', 'Events', 'History'].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setActiveTab(t)}
            style={styles.tabPill}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === t }}
            accessibilityLabel={`Open ${t} tab`}
            hitSlop={HIT_SLOP}
          >
            <Text style={styles.tabText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View ref={toolbarRef} onLayout={(e) => setToolbarH(e.nativeEvent.layout.height)} style={styles.toolbarRow}>
        <Text style={{ fontWeight: '700' }}>Toolbar</Text>
        <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
          <TouchableOpacity
            onPress={undo}
            accessibilityRole="button"
            accessibilityLabel="Undo last action"
            hitSlop={HIT_SLOP}
            style={styles.pillBtn}
          >
            <Text style={styles.pillBtnText}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Reset all?', 'This will set all scores to 0.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reset', style: 'destructive', onPress: resetAll },
              ]);
            }}
            accessibilityRole="button"
            accessibilityLabel="Reset all scores to zero"
            hitSlop={HIT_SLOP}
            style={styles.pillBtn}
          >
            <Text style={styles.pillBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.middleLayer, { top: headerH + tabsH + toolbarH, bottom: footerH }]}>
        {activeTab === 'Score' && (
          <ScrollView contentContainerStyle={styles.teamGrid}>
            {['A','B','C','D'].map(k => <TeamCard key={k} teamKey={k} />)}
          </ScrollView>
        )}
        {activeTab === 'Events' && (
          <ScrollView contentContainerStyle={styles.teamGrid}>
            {state.events.slice().reverse().map((ev, idx) => (
              <View key={idx} style={styles.teamCard}>
                <Text>{`Team ${ev.team} ${ev.delta > 0 ? '+' : ''}${ev.delta}`}</Text>
                <Text style={{ color: '#555' }}>{new Date(ev.t).toLocaleString()}</Text>
              </View>
            ))}
            {!state.events.length && (
              <View style={styles.teamCard}><Text>No events yet.</Text></View>
            )}
          </ScrollView>
        )}
        {activeTab === 'History' && (
          <View style={styles.teamGrid}>
            <Text>History list coming next (wired to DB getMatches)</Text>
          </View>
        )}
      </View>

      <View
        ref={footerRef}
        onLayout={(e) => setFooterH(e.nativeEvent.layout.height)}
        style={styles.saveBar}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Save match. ${saveLabel.replace('•','').trim()}`}
      >
        <TouchableOpacity onPress={onSave} style={styles.saveInner}>
          <Text style={styles.saveText}>{saveLabel}</Text>
          <Text style={{ fontWeight: '800' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AppRoot() {
  return (
    <DbProvider>
      <ScoreScreen />
    </DbProvider>
  );
}

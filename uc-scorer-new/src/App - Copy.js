import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ✅ Use ONE import line for all safe-area items you need
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import styles, { COLORS } from "./styles";

// ✅ Single App component that wraps RootApp with Provider + SafeAreaView
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <RootApp />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}



function RootApp() {
  const insets = useSafeAreaInsets();

  // Team names & scores (A–D)
  const [teamA, setTeamA] = useState("Team A");
  const [teamB, setTeamB] = useState("Team B");
  const [teamC, setTeamC] = useState("Team C");
  const [teamD, setTeamD] = useState("Team D");

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [scoreC, setScoreC] = useState(0);
  const [scoreD, setScoreD] = useState(0);

  const [activeTab, setActiveTab] = useState("score");

  // Measured heights
  const [headerH, setHeaderH] = useState(0);
  const [tabsH, setTabsH] = useState(0);
  const [toolbarH, setToolbarH] = useState(0);
  const [footerH, setFooterH] = useState(0);

  const add = (setter) => (v) => setter((s) => Math.max(0, s + v));
  const resetScores = () => {
    setScoreA(0); setScoreB(0); setScoreC(0); setScoreD(0);
  };
  const undo = () => { /* TODO: hook up real undo stack */ };
  const saveMatch = () => {
    // TODO: hook into db.js and then reset
    resetScores();
  };

  // Floating window bounds (respect footer height + safe area)
  const topY = headerH + tabsH + toolbarH;
  const bottomY = footerH + insets.bottom;

  return (
    <View style={styles.root}>
      {/* Full-screen bright gradient background */}
      <LinearGradient
        colors={[COLORS.bgGradTop, COLORS.bgGradMid, COLORS.bgGradBottom]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bgGradient}
      />

      <StatusBar barStyle="light-content" />

      {/* Header (padding top uses safe area inside component) */}
      <HeaderBar
        title="University Challenge"
        subtitle="Your starter for 10"
        onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)}
      />

      {/* Tabs */}
      <TopTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLayout={(e) => setTabsH(e.nativeEvent.layout.height)}
      />

      {/* Toolbar (Undo / Reset) */}
      <Toolbar
        onUndo={undo}
        onReset={resetScores}
        onLayout={(e) => setToolbarH(e.nativeEvent.layout.height)}
      />

      {/* Floating middle layer (scrollable content) */}
      <View style={[styles.middleLayer, { top: topY, bottom: bottomY }]} pointerEvents="box-none">
        {activeTab === "score" && (
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            {/* Row 1: A & B */}
            <ScoreRow>
              <TeamPanel
                label="Team A"
                name={teamA} setName={setTeamA}
                score={scoreA}
                onPlus10={() => add(setScoreA)(10)}
                onPlus5={() => add(setScoreA)(5)}
                onMinus5={() => add(setScoreA)(-5)}
              />
              <TeamPanel
                label="Team B"
                name={teamB} setName={setTeamB}
                score={scoreB}
                onPlus10={() => add(setScoreB)(10)}
                onPlus5={() => add(setScoreB)(5)}
                onMinus5={() => add(setScoreB)(-5)}
              />
            </ScoreRow>

            {/* Row 2: C & D */}
            <View style={{ height: 16 }} />
            <ScoreRow>
              <TeamPanel
                label="Team C"
                name={teamC} setName={setTeamC}
                score={scoreC}
                onPlus10={() => add(setScoreC)(10)}
                onPlus5={() => add(setScoreC)(5)}
                onMinus5={() => add(setScoreC)(-5)}
              />
              <TeamPanel
                label="Team D"
                name={teamD} setName={setTeamD}
                score={scoreD}
                onPlus10={() => add(setScoreD)(10)}
                onPlus5={() => add(setScoreD)(5)}
                onMinus5={() => add(setScoreD)(-5)}
              />
            </ScoreRow>

            {/* Spacer so last row clears the pinned footer */}
            <View style={{ height: 24 }} />
          </ScrollView>
        )}
        {activeTab === "events" && <Placeholder label="Events coming soon" />}
        {activeTab === "history" && <Placeholder label="History coming soon" />}
      </View>

      {/* Save Match pinned; respects bottom inset */}
      <SaveMatchBar
        onLayout={(e) => setFooterH(e.nativeEvent.layout.height)}
        onSave={saveMatch}
        scoreA={scoreA + scoreC} // example: aggregate left vs right if you want
        scoreB={scoreB + scoreD}
      />
    </View>
  );
}

/* --- UI Components --- */

function HeaderBar({ title, subtitle, onLayout }) {
  const insets = useSafeAreaInsets();
  return (
   <View onLayout={onLayout} style={styles.headerWrap}>
      <LinearGradient
        colors={[COLORS.headerGradStart, COLORS.headerGradEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGrad}



      >
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSub}>{subtitle}</Text>
      </LinearGradient>
    </View>
  );
}

function TopTabs({ activeTab, setActiveTab, onLayout }) {
  const Item = ({ id, label }) => (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={() => setActiveTab(id)}
      style={[styles.tabBtn, activeTab === id && styles.tabBtnActive]}
    >
      <Text style={[styles.tabText, activeTab === id && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <View onLayout={onLayout} style={styles.tabsRow}>
      <Item id="score" label="Score" />
      <Item id="events" label="Events" />
      <Item id="history" label="History" />
    </View>
  );
}

function Toolbar({ onUndo, onReset, onLayout }) {
  return (
    <View onLayout={onLayout} style={styles.toolbarRow}>
      <TouchableOpacity onPress={onUndo} style={styles.toolBtn}>
        <Text style={styles.toolBtnIcon}>↩︎</Text>
        <Text style={styles.toolBtnText}>Undo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReset} style={styles.toolBtn}>
        <Text style={styles.toolBtnIcon}>⟳</Text>
        <Text style={styles.toolBtnText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

function ScoreRow({ children }) {
  return <View style={styles.teamRow}>{children}</View>;
}

function TeamPanel({ label, name, setName, score, onPlus10, onPlus5, onMinus5 }) {
  return (
    <View style={styles.teamCol}>
      <View style={styles.teamHeader}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.teamName}
          returnKeyType="done"
          blurOnSubmit
          placeholder={label}
          placeholderTextColor="#2b2b2b"
        />
      </View>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
      <View style={styles.btnCol}>
        <PillBtn label="+10 Starter" onPress={onPlus10} />
        <PillBtn label="+5 Bonus" onPress={onPlus5} />
        <PillBtn label="-5" onPress={onMinus5} />
      </View>
    </View>
  );
}

function PillBtn({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.pillBtn}>
      <Text style={styles.pillBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function Placeholder({ label }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{label}</Text>
    </View>
  );
}

function SaveMatchBar({ onLayout, onSave, scoreA, scoreB }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      onLayout={onLayout}
      style={[styles.saveBarWrap, { paddingBottom: 12 + insets.bottom }]}
      pointerEvents="box-none"
    >
      <View style={styles.saveBar}>
        <Text style={styles.saveBarScore}>{scoreA} — {scoreB}</Text>
        <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

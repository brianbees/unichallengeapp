import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./styles";              // default export
import { COLORS } from "./theme/colors";    // colors



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
  const undo = () => {};
  const saveMatch = () => { resetScores(); };

  // Floating window bounds (respect footer height + safe area)
  const topY = headerH + tabsH + toolbarH;
  const bottomY = footerH + insets.bottom;

  return (
    <View style={styles.root || { flex: 1 }}>
      {/* Full-screen gradient background */}
     <LinearGradient
  colors={[COLORS.backgroundTop, COLORS.backgroundBottom]}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }}
  style={StyleSheet.absoluteFillObject}
/>


      <StatusBar barStyle="light-content" />

      <HeaderBar
        title="University Challenge"
        subtitle="Your starter for 10"
        onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)}
      />

      <TopTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLayout={(e) => setTabsH(e.nativeEvent.layout.height)}
      />

      <Toolbar
        onUndo={undo}
        onReset={resetScores}
        onLayout={(e) => setToolbarH(e.nativeEvent.layout.height)}
      />

      {/* Floating middle layer (scrollable content) */}
      <View style={[styles.middleLayer || { position: "absolute", left: 0, right: 0 }, { top: topY, bottom: bottomY }]} pointerEvents="box-none">
        {activeTab === "score" && (
          <ScrollView contentContainerStyle={styles.scrollContent || { padding: 16 }} keyboardShouldPersistTaps="handled">
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

            <View style={{ height: 24 }} />
          </ScrollView>
        )}
        {activeTab === "events" && <Placeholder label="Events coming soon" />}
        {activeTab === "history" && <Placeholder label="History coming soon" />}
      </View>

      <SaveMatchBar
        onLayout={(e) => setFooterH(e.nativeEvent.layout.height)}
        onSave={saveMatch}
        scoreA={scoreA + scoreC}
        scoreB={scoreB + scoreD}
      />
    </View>
  );
}

/* --- UI Components (unchanged) --- */

function HeaderBar({ title, subtitle, onLayout }) {
  return (
    <View onLayout={onLayout} style={styles.headerWrap || {}}>
      <LinearGradient
        colors={[COLORS.backgroundTop, COLORS.backgroundBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGrad || { padding: 16 }}
      >
        <Text style={styles.headerTitle || { color: "#fff", fontSize: 20 }}>{title}</Text>
        <Text style={styles.headerSub || { color: "#ccc" }}>{subtitle}</Text>
      </LinearGradient>
    </View>
  );
}

function TopTabs({ activeTab, setActiveTab, onLayout }) {
  const Item = ({ id, label }) => (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={() => setActiveTab(id)}
      style={[styles.tabBtn || {}, activeTab === id && (styles.tabBtnActive || {})]}
    >
      <Text style={[styles.tabText || {}, activeTab === id && (styles.tabTextActive || {})]}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <View onLayout={onLayout} style={styles.tabsRow || { flexDirection: "row", padding: 8, gap: 8 }}>
      <Item id="score" label="Score" />
      <Item id="events" label="Events" />
      <Item id="history" label="History" />
    </View>
  );
}

function Toolbar({ onUndo, onReset, onLayout }) {
  return (
    <View onLayout={onLayout} style={styles.toolbarRow || { flexDirection: "row", gap: 12, padding: 8 }}>
      <TouchableOpacity onPress={onUndo} style={styles.toolBtn || { padding: 8, backgroundColor: "#222", borderRadius: 8 }}>
        <Text style={styles.toolBtnIcon || { color: "#bbb" }}>↩︎</Text>
        <Text style={styles.toolBtnText || { color: "#fff" }}>Undo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onReset} style={styles.toolBtn || { padding: 8, backgroundColor: "#222", borderRadius: 8 }}>
        <Text style={styles.toolBtnIcon || { color: "#bbb" }}>⟳</Text>
        <Text style={styles.toolBtnText || { color: "#fff" }}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

function ScoreRow({ children }) {
  return <View style={styles.teamRow || { flexDirection: "row", gap: 12 }}>{children}</View>;
}

function TeamPanel({ label, name, setName, score, onPlus10, onPlus5, onMinus5 }) {
  return (
    <View style={styles.teamCol || { flex: 1, gap: 12 }}>
      <View style={styles.teamHeader || { backgroundColor: "#111", borderRadius: 12, padding: 12 }}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.teamName || { color: "#fff", fontSize: 18, fontWeight: "600" }}
          returnKeyType="done"
          blurOnSubmit
          placeholder={label}
          placeholderTextColor="#2b2b2b"
        />
      </View>
      <View style={styles.scoreCard || { backgroundColor: "#111", borderRadius: 12, padding: 16, alignItems: "center" }}>
        <Text style={styles.scoreLabel || { color: "#bbb", marginBottom: 6 }}>Score</Text>
        <Text style={styles.scoreText || { color: "#fff", fontSize: 32, fontWeight: "800" }}>{score}</Text>
      </View>
      <View style={styles.btnCol || { gap: 8 }}>
        <PillBtn label="+10 Starter" onPress={onPlus10} />
        <PillBtn label="+5 Bonus" onPress={onPlus5} />
        <PillBtn label="-5" onPress={onMinus5} />
      </View>
    </View>
  );
}

function PillBtn({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.pillBtn || { backgroundColor: "#333", paddingVertical: 10, borderRadius: 999, alignItems: "center" }}>
      <Text style={styles.pillBtnText || { color: "#fff", fontWeight: "600" }}>{label}</Text>
    </TouchableOpacity>
  );
}

function Placeholder({ label }) {
  return (
    <View style={styles.placeholder || { backgroundColor: "#111", borderRadius: 12, padding: 24, alignItems: "center" }}>
      <Text style={styles.placeholderText || { color: "#bbb" }}>{label}</Text>
    </View>
  );
}

function SaveMatchBar({ onLayout, onSave, scoreA, scoreB }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      onLayout={onLayout}
      style={[styles.saveBarWrap || { position: "absolute", left: 0, right: 0, bottom: 0 }, { paddingBottom: 12 + insets.bottom }]}
      pointerEvents="box-none"
    >
      <View style={styles.saveBar || { marginHorizontal: 16, backgroundColor: "#111", borderRadius: 999, paddingVertical: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.saveBarScore || { color: "#fff", fontSize: 18, fontWeight: "700" }}>{scoreA} — {scoreB}</Text>
        <TouchableOpacity onPress={onSave} style={styles.saveBtn || { backgroundColor: "#F9DABA", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999 }}>
          <Text style={styles.saveBtnText || { color: "#111", fontWeight: "800" }}>Save Match</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

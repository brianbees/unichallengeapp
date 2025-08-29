// src/styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "./theme/colors";
import { SPACING } from "./theme/tokens";

const styles = StyleSheet.create({
  // Root container
  root: {
    flex: 1,
  },

  // Fullscreen background overlay
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.bg,
  },

  // Middle floating layer; App sets top/bottom dynamically
  middleLayer: {
    position: "absolute",
    left: 0,
    right: 0,
  },

  scrollContent: {
    padding: SPACING.md,
  },

  // Header
  headerWrap: {
    width: "100%",
  },
  headerGrad: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 14,
    color: COLORS.mutedText,
  },

  // Tabs
  tabsRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: SPACING.md,
  },
  tabBtn: {
    backgroundColor: COLORS.pillBg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tabBtnActive: {
    backgroundColor: COLORS.accent,
  },
  tabText: { color: COLORS.pillText },
  tabTextActive: { color: "#111" },

  // Toolbar
  toolbarRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: SPACING.md,
    paddingBottom: 8,
  },
  toolBtn: {
    backgroundColor: COLORS.cardBg,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  toolBtnIcon: { color: COLORS.mutedText, fontSize: 16 },
  toolBtnText: { color: COLORS.text },

  // Teams grid
  teamRow: {
    flexDirection: "row",
    gap: 12,
  },
  teamCol: {
    flex: 1,
    gap: 12,
  },
  teamHeader: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 12,
  },
  teamName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "600",
  },
  scoreCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  scoreLabel: { color: COLORS.mutedText, marginBottom: 6 },
  scoreText: { color: COLORS.text, fontSize: 32, fontWeight: "800" },

  btnCol: { gap: 8 },
  pillBtn: {
    backgroundColor: COLORS.pillBg,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  pillBtnText: { color: COLORS.pillText, fontWeight: "600" },

  // Placeholder
  placeholder: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  placeholderText: { color: COLORS.mutedText },

  // Save bar
  saveBarWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  saveBar: {
    marginHorizontal: SPACING.md,
    marginTop: 8,
    backgroundColor: COLORS.cardBg,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveBarScore: { color: COLORS.text, fontSize: 18, fontWeight: "700" },
  saveBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  saveBtnText: { color: "#111", fontWeight: "800" },
});

export default styles;

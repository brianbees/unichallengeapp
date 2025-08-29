import { StyleSheet } from "react-native";

/**
 * Bright "classic" look, same mechanics:
 * - Floating middle layer (absolute between measured header+tabs+toolbar and footer)
 * - Scrollable middle content
 * - Save bar pinned to bottom (safe-area aware)
 * - Accent yellow = #F9DABA
 */
export const COLORS = {
  // App background gradient (top → bottom)
  bgGradTop: "#5B2BE5",    // vibrant purple
  bgGradMid: "#933BD4",    // mid violet
  bgGradBottom: "#F04FA0", // magenta/pink
  text: "#111",
  textOnDark: "#FFFFFF",
  subText: "#3B3B3B",
  accent: "#F9DABA",       // requested yellow
  // Header gradient (left → right)
  headerGradStart: "#3B59FF",
  headerGradEnd: "#21A0FF",
  // Surfaces
  card: "#FFFFFF",
  cardTint: "rgba(255,255,255,0.2)",
  pill: "#FFFFFF",
  pillBorder: "rgba(17,17,17,0.15)",
};

const z = {
  header: 30,
  middle: 10,
  footer: 40,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
  },

  // Background gradient layer
  bgGradient: {
    ...StyleSheet.absoluteFillObject,
  },

  /* HEADER */
  headerWrap: {
    zIndex: z.header,
    elevation: z.header,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  headerGrad: {
    borderRadius: 22,
    paddingTop: 8,// smaller gap above text
    paddingBottom: 14,   // keep space below if you want
    paddingHorizontal: 18,
    alignItems: "center",      // 👈 centres horizontally
    justifyContent: "center",  // 👈 centres vertically
    width: "100%",      // relative to screen (e.g. 80%)
    alignSelf: "center", // keep it centred horizontally

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  headerSub: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    fontSize: 14,
  },

  /* TABS (big pills) */
  tabsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
    zIndex: z.header,
    elevation: z.header,
  },
  tabBtn: {
    backgroundColor: COLORS.pill,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.pillBorder,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  tabBtnActive: {
    backgroundColor: COLORS.accent,
    borderColor: "rgba(0,0,0,0.15)",
  },
  tabText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "800",
  },
  tabTextActive: {
    color: "#111",
  },

  /* TOOLBAR (Undo/Reset) */
  toolbarRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  toolBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.pillBorder,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  toolBtnIcon: {
    fontSize: 16,
  },
  toolBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  /* FLOATING MIDDLE */
  middleLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: z.middle,
    elevation: z.middle,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },

  /* SCORE */
  teamRow: {
    flexDirection: "row",
    gap: 16,
  },
  teamCol: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 26,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  teamHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  teamName: {
    backgroundColor: "#FFEFD5",
    color: "#111",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    width: "90%",
    textAlign: "center",
  },
  scoreCard: {
    backgroundColor: "#D6ECFF",
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 10,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  scoreLabel: {
    color: "#5B6B7A",
    fontSize: 14,
    marginBottom: 4,
  },
  scoreText: {
    color: "#111",
    fontSize: 54,
    fontWeight: "900",
  },

  btnCol: {
    gap: 12,
  },
  pillBtn: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 999,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.pillBorder,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pillBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  /* PLACEHOLDER */
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  placeholderText: {
    color: "#111",
  },

  /* SAVE MATCH (PINNED) */
  saveBarWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,                 // real bottom of screen
    zIndex: 999,
    elevation: 12,
    alignItems: "stretch",
    backgroundColor: "#FFFFFF", // solid footer block
    paddingTop: 0,              // starts exactly at top of the pill
    // NOTE: no paddingBottom here — SafeAreaView adds it
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  saveBar: {
    backgroundColor: "rgba(255,255,255,0.25)", // the pill
    borderRadius: 999,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  saveBarScore: {
    color: "#111",
    fontSize: 16,
    fontWeight: "800",
  },
  saveBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  saveBtnText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "900",
  },

});

export default styles;

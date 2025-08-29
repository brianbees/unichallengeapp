// src/styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "./theme/colors";
import { SPACING } from "@/theme/tokens"; // keep if you already have tokens

const styles = StyleSheet.create({
  // Background gradient layer
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.bg,
  },

  container: {
    flex: 1,
    padding: SPACING?.md || 16,
    backgroundColor: COLORS.bg,
  },

  header: {
    paddingVertical: SPACING?.sm || 8,
    paddingHorizontal: SPACING?.md || 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },

  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.pillBg,
    marginRight: 8,
  },

  pillText: {
    color: COLORS.pillText,
    fontSize: 14,
  },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },

  cardContent: {
    fontSize: 14,
    color: COLORS.mutedText,
  },
});

export default styles;

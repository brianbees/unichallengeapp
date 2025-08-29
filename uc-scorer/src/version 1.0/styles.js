import { StyleSheet } from 'react-native';

export const colors = {
  // BBC palette vibes
  bg: '#f5f6f8',          // page background
  card: '#ffffff',        // card background
  border: '#e5e7eb',      // card border
  text: '#0b0c0c',        // main text
  muted: '#6b7280',
  yellow: '#ffd100',      // BBC yellow (primary accent)
  blue: '#1f6feb',        // BBC link blue
  danger: '#d92d20',
  success: '#16a34a',

  teamA: '#2f7dd1',       // team accents
  teamB: '#e67e22',
};

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16, paddingTop: 44 },

  row: { flexDirection: 'row', alignItems: 'center' },
  spaceBetween: { justifyContent: 'space-between' },
  center: { justifyContent: 'center', alignItems: 'center' },

  headerBar: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '900', letterSpacing: 0.3 },
  headerSub: { color: '#e8f0ff', fontSize: 12, marginTop: 2 },

  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  h1: { fontSize: 22, fontWeight: '800', color: colors.text, letterSpacing: 0.2 },
  h2: { fontSize: 18, fontWeight: '800', color: colors.text },
  text: { color: colors.text, fontSize: 16 },
  small: { fontSize: 12, color: colors.muted },

  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 12,
    padding: 10, fontSize: 16, color: colors.text, backgroundColor: '#fff'
  },

  // Pill button base
  button: {
    paddingVertical: 12, paddingHorizontal: 14, borderRadius: 999,
    borderWidth: 1, borderColor: colors.border, backgroundColor: '#fff',
    minHeight: 44,
  },
  buttonText: { fontSize: 16, fontWeight: '800', color: colors.text },

  // Filled pill (yellow)
  pillFilled: {
    backgroundColor: colors.yellow, borderColor: '#e6c200',
  },
  pillFilledText: { color: '#111' },

  // Flat pill (outline)
  pillOutline: {
    backgroundColor: '#fff', borderColor: colors.border,
  },

  // Big score tile
  scoreTile: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#f0f3f8',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bigScore: { fontSize: 56, fontWeight: '900', color: colors.text, lineHeight: 60 },

  // Gaps
  mt4: { marginTop: 4 }, mt8: { marginTop: 8 }, mt12: { marginTop: 12 }, mt16: { marginTop: 16 },
  mb8: { marginBottom: 8 }, mb12: { marginBottom: 12 }, mb16: { marginBottom: 16 },

  playerNameBar: {
    backgroundColor: '#fff5a3',   // soft yellow strip
    paddingVertical: 8,
    width: '100%',                // full width
    borderRadius: 12,             // rounded corners
    alignItems: 'center',         // center horizontally
    justifyContent: 'center',     // center vertically
    marginVertical: 6,            // small spacing
  },

  playerNameText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 1,
    color: '#000',
    textAlign: 'center',
  },

});

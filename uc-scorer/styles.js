import { StyleSheet } from 'react-native';
import { COLORS } from '@/theme/colors';
import { SPACING, RADII, Z } from '@/theme/tokens';

export const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    zIndex: Z.bg,
  },
  root: { flex: 1 },

  headerWrap: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  headerLozenge: {
    alignSelf: 'center',
    borderRadius: RADII.pill,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.headerBlue,
  },
  headerText: {
    color: COLORS.textOnBlue,
    fontSize: 18,
    fontWeight: '700',
  },

  tabsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  tabPill: {
    backgroundColor: COLORS.pillBG,
    borderRadius: RADII.pill,
    paddingVertical: 10,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabText: {
    color: COLORS.pillText,
    fontWeight: '600',
  },

  toolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },

  middleLayer: {
    position: 'absolute',
    left: 0, right: 0,
    zIndex: Z.middle,
  },

  teamGrid: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  teamCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: RADII.card,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  pillBtn: {
    backgroundColor: COLORS.pillBG,
    borderRadius: RADII.pill,
    paddingVertical: 10,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillBtnText: {
    color: COLORS.pillText,
    fontWeight: '700',
  },

  saveBar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    zIndex: Z.footer,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  saveInner: {
    backgroundColor: COLORS.accent,
    borderRadius: RADII.pill,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveText: {
    fontWeight: '800',
  },
});

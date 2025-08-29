# UC Scorer Patch (tabs + sound + history)

This bundle restores **Score / Events / History** tabs, adds **applause** sound on +10/+5, and saves matches to a local SQLite DB.

## Files
- `App.js` — Floating layout with tabs. Events and History fully wired.
- `styles.js` — Your existing visual style (**unchanged**).
- `db.js` — SQLite helpers (`initDb`, `saveMatch`, `listMatches`).
- `assets/applause.wav` — Placeholder tone (replace with your real applause if you wish).

## Install deps
```bash
npx expo install expo-linear-gradient react-native-safe-area-context expo-sqlite expo-av
```

## Asset paths
- Sound is required as: `require("./assets/applause.wav")` (because `App.js` is at project root).

## Notes
- Expo AV is deprecated in SDK 54; this uses it for compatibility with your current build. You can migrate to `expo-audio` later.
- The Save button stores **A+C vs B+D** to match the current footer total.

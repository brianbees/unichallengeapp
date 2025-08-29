import * as SQLite from 'expo-sqlite';

export async function getDb() {
  return await SQLite.openDatabaseAsync('uc.db');
}

export async function initDb() {
  const db = await getDb();
  await db.execAsync(`
    PRAGMA journal_mode = wal;
    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL,
      team_a TEXT NOT NULL,
      team_b TEXT NOT NULL,
      score_a INTEGER NOT NULL,
      score_b INTEGER NOT NULL,
      events_json TEXT NOT NULL
    );
  `);
  return db;
}

export async function saveMatch({ teamA, teamB, scoreA, scoreB, events }) {
  const db = await getDb();
  const created_at = new Date().toISOString();
  const events_json = JSON.stringify(events);
  await db.runAsync(
    'INSERT INTO matches (created_at, team_a, team_b, score_a, score_b, events_json) VALUES (?,?,?,?,?,?)',
    [created_at, teamA, teamB, scoreA, scoreB, events_json]
  );
}

export async function listMatches() {
  const db = await getDb();
  return await db.getAllAsync('SELECT id, created_at, team_a, team_b, score_a, score_b FROM matches ORDER BY id DESC');
}

export async function getMatch(id) {
  const db = await getDb();
  return await db.getFirstAsync('SELECT * FROM matches WHERE id=?', [id]);
}

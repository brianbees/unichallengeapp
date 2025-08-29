export const LATEST_VERSION = 1;

export const MIGRATIONS = {
  1: async (db) => {
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at INTEGER NOT NULL,
        teamA TEXT, teamB TEXT, teamC TEXT, teamD TEXT,
        scoreA INTEGER NOT NULL DEFAULT 0,
        scoreB INTEGER NOT NULL DEFAULT 0,
        scoreC INTEGER NOT NULL DEFAULT 0,
        scoreD INTEGER NOT NULL DEFAULT 0,
        events_json TEXT NULL
      );
    `);
  },
};

export async function getUserVersion(db) {
  const res = await db.getFirstAsync('PRAGMA user_version;');
  return res?.user_version ?? 0;
}

export async function setUserVersion(db, v) {
  await db.execAsync(`PRAGMA user_version = ${v};`);
}

export async function runMigrations(db) {
  const current = await getUserVersion(db);
  for (let v = current + 1; v <= LATEST_VERSION; v++) {
    const mig = MIGRATIONS[v];
    if (typeof mig === 'function') {
      await db.withTransactionAsync(async () => {
        await mig(db);
        await setUserVersion(db, v);
      });
    }
  }
}

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database('medicheck.db');
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

const insertOrReplaceCompetitor = db.prepare(
  'INSERT OR REPLACE INTO competitors (country, name, reg_no, date) VALUES (?, ?, ?, ?)'
);
const insertOrReplaceHsStat = db.prepare(
  'INSERT OR REPLACE INTO hs_stats (country, hs_code, ratio, month) VALUES (?, ?, ?, ?)'
);
const insertEvent = db.prepare(
  'INSERT INTO events (country, type, summary, date) VALUES (?, ?, ?, ?)'
);

function getLatestEvents(limit = 30) {
  return db.prepare('SELECT * FROM events ORDER BY date DESC LIMIT ?').all(limit);
}

module.exports = {
  db,
  insertOrReplaceCompetitor,
  insertOrReplaceHsStat,
  insertEvent,
  getLatestEvents,
};

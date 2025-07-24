CREATE TABLE IF NOT EXISTS competitors (
  country TEXT,
  name TEXT,
  reg_no TEXT,
  date TEXT,
  PRIMARY KEY (country, reg_no)
);

CREATE TABLE IF NOT EXISTS hs_stats (
  country TEXT,
  hs_code TEXT,
  ratio REAL,
  month TEXT,
  PRIMARY KEY (country, hs_code, month)
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country TEXT,
  type TEXT,
  summary TEXT,
  date TEXT
);

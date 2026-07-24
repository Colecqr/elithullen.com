-- Reaction counts, one row per (page, emoji) pair.
CREATE TABLE IF NOT EXISTS reactions (
  slug  TEXT    NOT NULL,
  emoji TEXT    NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, emoji)
);

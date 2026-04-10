import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import logger from '../config/logger.js';

const dbPath = process.env.DATABASE_URL ?? './database.db';
const sqlite = new Database(dbPath);
sqlite.pragma('foreign_keys = ON');
export const db = drizzle(sqlite);

export const testConnection = () => {
  try {
    const result = sqlite.prepare('SELECT 1 + 1 AS result').get();
    logger.info('Connection has been established successfully.');
    logger.info('Test Query Result:', result);
    return true;
  } catch (e) {
    logger.error('Unable to connect to the Database:', e);
    return false;
  }
};

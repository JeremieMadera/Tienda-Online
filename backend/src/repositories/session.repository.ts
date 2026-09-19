import pool from '../database.js';

export async function createSession(userId: number, tokenHash: string, expiresAt: Date) {
  const result = await pool.query(
    'INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING id, user_id, created_at, expires_at',
    [userId, tokenHash, expiresAt]
  );
  return result.rows[0];

}
export async function getSessionByTokenHash(tokenHash: string) {
  const result = await pool.query(
    'SELECT id, user_id, created_at, expires_at FROM sessions WHERE token_hash = $1',
    [tokenHash]
  );
  return result.rows[0];
}
export async function deleteSessionByTokenHash(tokenHash: string) {
  await pool.query(
    'DELETE FROM sessions WHERE token_hash = $1',
    [tokenHash]
  );
}
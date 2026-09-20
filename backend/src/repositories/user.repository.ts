import pool from '../database.js';
import type {StoredUser, PublicUser} from '../types/user.types.js';

class UserRepository {
  async createUser(email: string, password_hash: string): Promise<PublicUser> {
    const query = "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at";
    const result = await pool.query(query, [email, password_hash]);
    return result.rows[0];
  }

  async getUserByEmail(email: string): Promise<StoredUser | undefined> {
    const query = "SELECT id, email, created_at, password_hash FROM users WHERE email = $1";
    const result = await pool.query(query, [email]) ;
    return result.rows[0];
  }

  async getUserById(id: number): Promise<PublicUser | undefined> {
    const query = "SELECT id, email, created_at FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default new UserRepository();

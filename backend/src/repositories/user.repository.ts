import pool from '../database.js';

class UserRepository {
  async createUser( email: string, password_hash: string){
    const query = "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at";
    const result = await pool.query(query, [email, password_hash]);
    return result.rows[0];
  }

    async getUserByEmail(email: string) {
      const query = "SELECT id, email, created_at, password_hash FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
}

export default new UserRepository();


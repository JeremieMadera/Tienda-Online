import {hashPassword} from "../auth/password.js";
import userRepository from "./user.repository.js";
import pool from '../database.js';
async function createTestUser(email: string, password: string) {
  const password_hash = await hashPassword(password);
  const user = await userRepository.createUser(email, password_hash);
  return user;
}
try {
  const testUser = await createTestUser('test@example2.com', 'password123');
  const foundUser = await userRepository.getUserByEmail('test@example2.com');
  const missingUser = await userRepository.getUserByEmail('nonexistent@example.com');
  console.log('Test user created:', testUser);
  console.log('Found user:', foundUser !== undefined && foundUser.password_hash !== undefined );
  console.log('Email not found:', missingUser);
} catch (error) {
  console.error('Error creating test user:', error);
}
finally {
  await pool.end();
}

export { createTestUser };
import { hashPassword } from "../auth/password.js";
import type {PublicUser} from '../types/user.types.js';
import userRepository from "../repositories/user.repository.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function registerUser(email: string, password: string): Promise<PublicUser> {
     email = email.trim().toLowerCase();
    if (email === '' || password.trim() === '') {
        throw new Error('Email and password cannot be empty');
    }
   if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    
    if (!emailPattern.test(email)) {
        throw new Error('Invalid email format');
    }

    
    try {
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser(email, hashedPassword);
    return {
        id: user.id,
        email: user.email,
        created_at: user.created_at
    };
    }
    catch (error) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "constraint" in error &&
    error.code === "23505" &&
    error.constraint === "users_email_key"
  ) {
    throw new Error("Email already exists");
  }

  throw error;
}
    }


   
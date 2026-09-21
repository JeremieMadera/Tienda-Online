import { hashPassword } from "../auth/password.js";
import type { PublicUser, LoginResult } from '../types/user.types.js';
import userRepository from "../repositories/user.repository.js";
import { comparePassword } from "../auth/password.js";
import { generateSessionToken, hashSessionToken } from "../auth/session-token.js";
import { createSession } from "../repositories/session.repository.js";

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
            created_at: user.created_at,
            role: user.role
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

export async function loginUser(email: string, password: string): Promise<LoginResult> {
    email = email.trim().toLowerCase();
    if (email === '' || password.trim() === '') {
        throw new Error('Email and password cannot be empty');
    }
    const foundUser = await userRepository.getUserByEmail(email);
    if (!foundUser) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await comparePassword(password, foundUser.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const sessionToken = generateSessionToken();
    const tokenHash = hashSessionToken(sessionToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await createSession(foundUser.id, tokenHash, expiresAt);

    return {
        user: {
            id: foundUser.id,
            email: foundUser.email,
            created_at: foundUser.created_at,
            role: foundUser.role
        },
        sessionToken
    };
}


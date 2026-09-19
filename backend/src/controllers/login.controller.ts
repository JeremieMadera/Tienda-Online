import type { Request, Response } from 'express';
import { loginUser } from '../services/auth.service.js';

export async function login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;



    if (typeof email !== 'string' || typeof password !== 'string') {
        res.status(400).json({ error: 'Email and password must be strings' });
        return;
    }

    try {
        const result = await loginUser(email, password);
        res.cookie('session_token', result.sessionToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: 'Login successful', user: result.user });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        if (message === 'Invalid credentials') {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        if (message === 'Email and password cannot be empty') {
            res.status(400).json({ error: message });
            return;
        }

        res.status(500).json({ error: 'Internal server error' });
    }
}
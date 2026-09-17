import type {Request, Response} from 'express';
import {registerUser} from '../services/auth.service.js';

async function register(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password ;

    if(typeof email !== 'string' || typeof password !== 'string' ){
        res.status(400).json({ error: 'Email and password must be strings' });
        return;
    }

  try {
    const user = await registerUser(email  , password);
    res.status(201).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    if (message.includes('Invalid email format') || message.includes('Password must be at least 8 characters long') || message.includes('Email and password cannot be empty')) {
      res.status(400).json({ error: (message) });
    } else if (message.includes('Email already exists')) {
      res.status(409).json({ error: (message) });
    }
    else {
      res.status(500).json({ error: 'Internal server error' });
    }

  }
}

export { register };
import type { Request, Response } from 'express';
import userRepository from '../repositories/user.repository.js';

export async function getCurrentUser(_req: Request, res: Response): Promise<void> {
  const userId = res.locals.userId;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    const user = await userRepository.getUserById(userId);

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Failed to load current user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

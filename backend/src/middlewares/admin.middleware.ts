import type { NextFunction, Request, Response } from 'express';
import userRepository from '../repositories/user.repository.js';

export async function requireAdmin(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = res.locals.userId;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    const user = await userRepository.getUserById(userId);

    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: 'Administrator access required' });
      return;
    }

    next();
  } catch (error) {
    console.error('Failed to verify administrator access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

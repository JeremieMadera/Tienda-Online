import type { NextFunction, Request, Response } from 'express';
import { hashSessionToken } from '../auth/session-token.js';
import { getSessionByTokenHash } from '../repositories/session.repository.js';

function getSessionToken(cookieHeader: string | undefined): string | undefined {
  const sessionCookie = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('session_token='));

  if (!sessionCookie) {
    return undefined;
  }

  return decodeURIComponent(sessionCookie.slice('session_token='.length));
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const sessionToken = getSessionToken(req.headers.cookie);

  if (!sessionToken) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    const tokenHash = hashSessionToken(sessionToken);
    const session = await getSessionByTokenHash(tokenHash);

    if (!session || new Date(session.expires_at) <= new Date()) {
      res.status(401).json({ error: 'Invalid or expired session' });
      return;
    }

    res.locals.userId = session.user_id;
    next();
  } catch (error) {
    console.error('Failed to validate session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

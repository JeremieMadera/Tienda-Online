import type { Request, Response } from 'express';
import { hashSessionToken } from '../auth/session-token.js';
import { deleteSessionByTokenHash } from '../repositories/session.repository.js';

export async function logout(req: Request, res: Response): Promise<void> {
  const cookieHeader = req.headers.cookie;
  const sessionCookie = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('session_token='));

  if (sessionCookie) {
    const sessionToken = decodeURIComponent(
      sessionCookie.slice('session_token='.length)
    );
    const tokenHash = hashSessionToken(sessionToken);
    await deleteSessionByTokenHash(tokenHash);
  }

  res.clearCookie('session_token');
  res.status(204).send();
}

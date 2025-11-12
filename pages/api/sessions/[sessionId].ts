import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionManager } from '@/lib/sessionManager';
import { Session } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Session | { error: string }>
) {
  const { sessionId } = req.query;

  if (typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'Invalid sessionId' });
  }

  if (req.method === 'GET') {
    const session = sessionManager.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(200).json(session);
  } else if (req.method === 'DELETE') {
    const deleted = sessionManager.deleteSession(sessionId);
    if (!deleted) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(200).json({ message: 'Session deleted successfully' } as any);
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}


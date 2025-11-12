import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionManager } from '@/lib/sessionManager';
import { CreateSessionRequest, CreateSessionResponse } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateSessionResponse | { error: string }>
) {
  if (req.method === 'POST') {
    try {
      const { userId } = req.body as CreateSessionRequest;
      const session = sessionManager.createSession(userId);

      res.status(201).json({
        sessionId: session.id,
        message: 'Session created successfully',
      });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      
      if (userId && typeof userId === 'string') {
        const sessions = sessionManager.getUserSessions(userId);
        res.status(200).json({ sessions } as any);
      } else {
        const sessions = sessionManager.getAllSessions();
        res.status(200).json({ sessions } as any);
      }
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}


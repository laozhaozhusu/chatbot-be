import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionManager } from '@/lib/sessionManager';
import { processMessage } from '@/lib/chatService';
import { Message, SendMessageRequest } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ messages: Message[] } | { message: Message } | { error: string }>
) {
  const { sessionId } = req.query;

  if (typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'Invalid sessionId' });
  }

  if (req.method === 'GET') {
    try {
      const messages = sessionManager.getMessages(sessionId);
      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { content } = req.body as SendMessageRequest;
      
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      // 检查会话是否存在
      const session = sessionManager.getSession(sessionId);
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      // 先添加用户消息
      const userMessage = sessionManager.addMessage(sessionId, 'user', content);

      // 处理消息并生成助手回复
      const assistantMessage = await processMessage(sessionId, content);

      // 返回用户消息和助手消息
      res.status(200).json({ 
        userMessage,
        assistantMessage 
      } as any);
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


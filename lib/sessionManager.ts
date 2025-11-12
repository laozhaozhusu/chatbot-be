import { v4 as uuidv4 } from 'uuid';
import { Session, Message } from '@/types';

class SessionManager {
  private sessions: Map<string, Session> = new Map();

  /**
   * 创建新会话
   */
  createSession(userId?: string): Session {
    const sessionId = uuidv4();
    const now = new Date();
    
    const session: Session = {
      id: sessionId,
      userId,
      createdAt: now,
      updatedAt: now,
      messages: [],
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * 获取会话
   */
  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * 获取用户的所有会话
   */
  getUserSessions(userId: string): Session[] {
    return Array.from(this.sessions.values()).filter(
      session => session.userId === userId
    );
  }

  /**
   * 添加消息到会话
   */
  addMessage(sessionId: string, role: 'user' | 'assistant', content: string): Message {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const message: Message = {
      id: uuidv4(),
      sessionId,
      role,
      content,
      timestamp: new Date(),
    };

    session.messages.push(message);
    session.updatedAt = new Date();
    
    return message;
  }

  /**
   * 获取会话的所有消息
   */
  getMessages(sessionId: string): Message[] {
    const session = this.sessions.get(sessionId);
    return session?.messages || [];
  }

  /**
   * 删除会话
   */
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * 获取所有会话（用于调试）
   */
  getAllSessions(): Session[] {
    return Array.from(this.sessions.values());
  }
}

// 单例模式
export const sessionManager = new SessionManager();


export interface Session {
  id: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface Message {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CreateSessionRequest {
  userId?: string;
}

export interface CreateSessionResponse {
  sessionId: string;
  message: string;
}

export interface SendMessageRequest {
  sessionId: string;
  content: string;
}

export interface SendMessageResponse {
  messageId: string;
  message: Message;
}

// WebSocket 事件类型
export interface ServerToClientEvents {
  message: (message: Message) => void;
  sessionCreated: (session: Session) => void;
  error: (error: string) => void;
}

export interface ClientToServerEvents {
  createSession: (data: CreateSessionRequest, callback: (response: CreateSessionResponse) => void) => void;
  sendMessage: (data: SendMessageRequest, callback: (response: SendMessageResponse) => void) => void;
  joinSession: (sessionId: string) => void;
  leaveSession: (sessionId: string) => void;
}


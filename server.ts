import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { sessionManager } from './lib/sessionManager';
import { processMessage } from './lib/chatService';
import type { ServerToClientEvents, ClientToServerEvents } from './types';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// 创建 Next.js 应用
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // 创建 HTTP 服务器
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // 创建 Socket.io 服务器
  const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
    httpServer,
    {
      cors: {
        origin: '*', // 生产环境中应该设置具体的域名
        methods: ['GET', 'POST'],
      },
    }
  );

  // Socket.io 连接处理
  io.on('connection', (socket) => {
    console.log(`客户端连接: ${socket.id}`);

    // 创建会话
    socket.on('createSession', async (data, callback) => {
      try {
        const session = sessionManager.createSession(data.userId);
        console.log(`会话已创建: ${session.id}`);
        
        // 加入会话房间
        socket.join(session.id);
        
        callback({
          sessionId: session.id,
          message: 'Session created successfully',
        });

        // 发送会话创建事件
        socket.emit('sessionCreated', session);
      } catch (error) {
        console.error('创建会话错误:', error);
        callback({
          sessionId: '',
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        socket.emit('error', 'Failed to create session');
      }
    });

    // 加入会话
    socket.on('joinSession', (sessionId) => {
      const session = sessionManager.getSession(sessionId);
      if (session) {
        socket.join(sessionId);
        console.log(`客户端 ${socket.id} 加入会话: ${sessionId}`);
      } else {
        socket.emit('error', `Session ${sessionId} not found`);
      }
    });

    // 离开会话
    socket.on('leaveSession', (sessionId) => {
      socket.leave(sessionId);
      console.log(`客户端 ${socket.id} 离开会话: ${sessionId}`);
    });

    // 发送消息
    socket.on('sendMessage', async (data, callback) => {
      try {
        const session = sessionManager.getSession(data.sessionId);
        if (!session) {
          throw new Error(`Session ${data.sessionId} not found`);
        }

        // 先添加用户消息
        const userMessage = sessionManager.addMessage(
          data.sessionId,
          'user',
          data.content
        );

        // 回复客户端（用户消息已保存）
        if (callback) {
          callback({
            messageId: userMessage.id,
            message: userMessage,
          });
        }

        // 向会话房间中的所有客户端广播用户消息
        io.to(data.sessionId).emit('message', userMessage);

        // 处理消息并生成助手回复
        const assistantMessage = await processMessage(
          data.sessionId,
          data.content
        );

        // 发送助手回复
        io.to(data.sessionId).emit('message', assistantMessage);

        console.log(`消息已发送到会话 ${data.sessionId}`);
      } catch (error) {
        console.error('发送消息错误:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        socket.emit('error', errorMessage);
        if (callback) {
          callback({
            messageId: '',
            message: {
              id: '',
              sessionId: data.sessionId,
              role: 'user',
              content: data.content,
              timestamp: new Date(),
            },
          });
        }
      }
    });

    // 断开连接
    socket.on('disconnect', () => {
      console.log(`客户端断开连接: ${socket.id}`);
    });
  });

  // 启动服务器
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket server is running on ws://${hostname}:${port}`);
  });
});


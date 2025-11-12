# Chatbot Backend

基于 Next.js 和 WebSocket 的聊天机器人后端服务（纯后端，无前端页面）。

## 功能特性

- ✅ WebSocket 实时通信（使用 Socket.io）
- ✅ 会话管理（创建、查询、删除会话）
- ✅ 实时聊天功能
- ✅ REST API 支持
- ✅ TypeScript 支持

## 技术栈

- **Next.js 14** - API 路由框架
- **Socket.io** - WebSocket 通信
- **TypeScript** - 类型安全
- **Node.js** - 运行时环境

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器（包含 WebSocket 和 REST API）：

```bash
npm run dev:server
```

服务器将在 `http://localhost:3000` 启动，同时提供：
- WebSocket 服务：`ws://localhost:3000`
- REST API：`http://localhost:3000/api/*`

### 生产模式

```bash
npm run build
npm start
```

## API 文档

### WebSocket 事件

#### 客户端 → 服务器

- `createSession(data, callback)` - 创建新会话
  - `data`: `{ userId?: string }`
  - `callback`: `(response: { sessionId: string, message: string }) => void`

- `joinSession(sessionId)` - 加入会话
  - `sessionId`: `string`

- `leaveSession(sessionId)` - 离开会话
  - `sessionId`: `string`

- `sendMessage(data, callback)` - 发送消息
  - `data`: `{ sessionId: string, content: string }`
  - `callback`: `(response: { messageId: string, message: Message }) => void`

#### 服务器 → 客户端

- `sessionCreated(session)` - 会话已创建
- `message(message)` - 收到新消息
- `error(error)` - 错误信息

### REST API

#### 健康检查

```http
GET /api/health
```

返回服务器状态和当前时间戳。

#### 创建会话

```http
POST /api/sessions
Content-Type: application/json

{
  "userId": "optional-user-id"
}
```

#### 获取会话列表

```http
GET /api/sessions?userId=user-id
```

#### 获取会话详情

```http
GET /api/sessions/:sessionId
```

#### 删除会话

```http
DELETE /api/sessions/:sessionId
```

#### 获取会话消息

```http
GET /api/sessions/:sessionId/messages
```

#### 发送消息（REST）

```http
POST /api/sessions/:sessionId/messages
Content-Type: application/json

{
  "content": "Hello, chatbot!"
}
```

## 使用示例

### WebSocket 客户端示例

客户端需要使用 `socket.io-client` 连接服务器：

```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// 创建会话
socket.emit('createSession', { userId: 'user-123' }, (response) => {
  console.log('Session created:', response.sessionId);
  
  // 加入会话
  socket.emit('joinSession', response.sessionId);
  
  // 发送消息
  socket.emit('sendMessage', {
    sessionId: response.sessionId,
    content: 'Hello, chatbot!'
  }, (response) => {
    console.log('Message sent:', response);
  });
});

// 监听消息
socket.on('message', (message) => {
  console.log('Received message:', message);
});

// 监听错误
socket.on('error', (error) => {
  console.error('Error:', error);
});
```

### REST API 客户端示例

```bash
# 创建会话
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-123"}'

# 发送消息
curl -X POST http://localhost:3000/api/sessions/{sessionId}/messages \
  -H "Content-Type: application/json" \
  -d '{"content": "Hello, chatbot!"}'

# 获取会话消息
curl http://localhost:3000/api/sessions/{sessionId}/messages
```

## 项目结构

```
chatbot-be/
├── pages/
│   └── api/
│       ├── health.ts          # 健康检查 API
│       └── sessions/          # 会话 REST API 路由
│           ├── index.ts       # 创建/获取会话列表
│           ├── [sessionId].ts # 获取/删除会话
│           └── [sessionId]/
│               └── messages.ts # 获取/发送消息
├── lib/
│   ├── sessionManager.ts      # 会话管理逻辑
│   └── chatService.ts         # 聊天服务（可集成 AI）
├── types/
│   └── index.ts               # TypeScript 类型定义
├── server.ts                  # WebSocket 服务器（集成 Next.js）
├── package.json
└── tsconfig.json
```

## 环境变量

创建 `.env.local` 文件：

```env
HOSTNAME=localhost
PORT=3000
NODE_ENV=development
```

## 注意事项

1. 当前会话数据存储在内存中，服务器重启后数据会丢失。生产环境建议使用数据库（如 Redis、MongoDB）持久化存储。
2. 当前聊天回复使用简单规则，生产环境应该集成 AI 模型（如 OpenAI、Claude 等）。
3. CORS 配置在生产环境中应该设置具体的域名。
4. 如果运行 `npm install` 时遇到 React 相关的依赖错误，Next.js 框架可能要求安装 `react` 和 `react-dom`（即使不使用前端页面）。可以运行 `npm install react react-dom` 来解决。

## 扩展功能

- [ ] 集成 AI 模型（OpenAI、Claude 等）
- [ ] 数据库持久化（Redis、MongoDB）
- [ ] 用户认证和授权
- [ ] 消息历史记录
- [ ] 文件上传支持
- [ ] 多语言支持

## 许可证

MIT


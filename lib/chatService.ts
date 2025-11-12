import { sessionManager } from './sessionManager';
import { Message } from '@/types';

/**
 * 处理用户消息并生成回复
 * 这里是一个简单的示例，实际应用中可以集成 AI 模型
 * 注意：此函数假设用户消息已经添加到会话中
 */
export async function processMessage(
  sessionId: string,
  userMessage: string
): Promise<Message> {
  // 生成助手回复（这里使用简单的规则，实际应该调用 AI 模型）
  const assistantReply = generateReply(userMessage);

  // 添加助手回复
  const assistantMsg = sessionManager.addMessage(
    sessionId,
    'assistant',
    assistantReply
  );

  return assistantMsg;
}

/**
 * 生成回复（示例实现）
 * 实际应用中应该调用 OpenAI、Claude 等 AI 服务
 */
function generateReply(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // 简单的规则回复（示例）
  if (lowerMessage.includes('你好') || lowerMessage.includes('hello')) {
    return '你好！我是聊天机器人，有什么可以帮助你的吗？';
  }

  if (lowerMessage.includes('帮助') || lowerMessage.includes('help')) {
    return '我可以帮助你解答问题、进行对话等。请告诉我你需要什么帮助。';
  }

  if (lowerMessage.includes('时间') || lowerMessage.includes('time')) {
    return `当前时间是：${new Date().toLocaleString('zh-CN')}`;
  }

  // 默认回复
  return `我收到了你的消息："${userMessage}"。这是一个示例回复，你可以集成 AI 模型来生成更智能的回复。`;
}


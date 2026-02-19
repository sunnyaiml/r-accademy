import apiClient from '../utils/apiClient';
import { Message } from '../types/student.types';

/**
 * Chat Service - API endpoints for chat-related operations (REST API for message history)
 * Real-time messaging is handled via Socket.io in the components
 */
export const chatService = {
  /**
   * Get message history for a chat group
   * @param groupId - Chat group ID
   * @param limit - Number of messages to fetch (default: 50)
   * @param offset - Offset for pagination (default: 0)
   */
  getMessages: (groupId: number, limit = 50, offset = 0) =>
    apiClient.get<Message[]>(`/chat/groups/${groupId}/messages`, {
      params: { limit, offset },
    }),

  /**
   * Send a message to a chat group (fallback REST endpoint)
   * Prefer using Socket.io for real-time messaging
   * @param groupId - Chat group ID
   * @param content - Message content
   */
  sendMessage: (groupId: number, content: string) =>
    apiClient.post<{ success: boolean; message: Message }>(
      `/chat/groups/${groupId}/messages`,
      { content }
    ),

  /**
   * Delete a message (teacher only)
   * @param messageId - Message ID to delete
   */
  deleteMessage: (messageId: number) =>
    apiClient.delete<{ success: boolean }>(`/chat/messages/${messageId}`),
};

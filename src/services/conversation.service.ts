import { ConversationModel } from "../models/conversation.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import { type ConversationPayload, type MessagePayload } from "../types/conversation.type.ts";
import { type Conversation } from "../types/conversation.type.ts";

export const conversationsServices = {
  getAllConversationByUser: async (
    userId: string,
  ): Promise<Conversation[]> => {
    const conversations = await ConversationModel.findAllConversationByUser(
      userId,
    );
    return conversations;
  },
  getConversationById: async (
    conversation_id: string,
  ): Promise<Conversation> => {
    const conversation =
      await ConversationModel.findConversationById(conversation_id);
    if (!conversation) throw new ApiError(404, "No conversation found");
    return conversation;
  },
  startConversation: async (
    payload: ConversationPayload & { seller_id: string },
    buyer_id: string,
  ): Promise<Conversation> => {
    const conversation = await ConversationModel.startConversation({
      product_id: payload.product_id,
      buyer_id,
      seller_id: payload.seller_id,
    });
    return conversation;
  },
  sendMessage: async (
    payload: MessagePayload,
    conversation_id: string,
    sender_id: string,
  ): Promise<MessagePayload> => {
    const message = await ConversationModel.sendMessage({
      message_text: payload.message_text,
      conversation_id,
      sender_id,
    });
    return message;
  },
};
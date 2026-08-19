import { ConversationModel } from "../models/conversation.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import { type ConversationPayload } from "../types/conversation.type.ts";
import { type Conversation } from "../types/conversation.type.ts";

export const conversationsServices = {
  getAllConversation: async (): Promise<Conversation[]> => {
    const conversation = await ConversationModel.findAllConversation();
    return conversation;
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
};
import { prisma } from "../lib/prisma.ts";
import type { Conversation } from "../types/conversation.type.ts";

export const ConversationModel = {
  findAllConversation: async (): Promise<Conversation[]> => {
    return prisma.conversation.findMany();
  },
  findConversationById: async (
    conversation_id: string,
  ): Promise<Conversation | null> => {
    return prisma.conversation.findUnique({ where: { conversation_id } });
  },
  startConversation: async (data: {
    product_id: string;
    buyer_id: string;
    seller_id: string;
    conversation_preview?: string;
  }): Promise<Conversation> => {
    return prisma.conversation.create({
      data: {
        product_id: data.product_id,
        buyer_id: data.buyer_id,
        seller_id: data.seller_id,
        conversation_preview: data.conversation_preview ?? "",
        unread: false,
      },
    });
  },
};
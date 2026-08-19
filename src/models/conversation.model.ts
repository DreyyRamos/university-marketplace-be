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
  startConversation: async (
    data: Omit<
      Conversation,
      | "unread"
      | "conversation_preview"
      | "seller"
      | "product"
      | "createdAt"
      | "updatedAt"
    >,
  ): Promise<Conversation> => {
    return prisma.conversation.create({
      data: {
        ...data,
        conversation_preview: "",
        unread: false,
      },
    });
  },
};

import { prisma } from "../lib/prisma.ts";
import type {
  Conversation,
  MessagePayload,
} from "../types/conversation.type.ts";

export const ConversationModel = {
  findAllConversation: async (): Promise<Conversation[]> => {
    return prisma.conversation.findMany({
      include: {
        seller: {
          select: {
            user_id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            user_rating: true,
            profile_image: true,
            createdAt: true,
          },
        },
        buyer: {
          select: {
            user_id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            user_rating: true,
            profile_image: true,
            createdAt: true,
          },
        },
        product: {
          select: {
            product_id: true,
            product_name: true,
            product_price: true,
            product_image: true,
            condition: true,
            location: true,
          },
        },
        messages: true,
      },
    });
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
    const existing = await prisma.conversation.findFirst({
      where: {
        product_id: data.product_id,
        buyer_id: data.buyer_id,
        seller_id: data.seller_id,
      },
    });

    if (existing) {
      return existing;
    }

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
  sendMessage: async (data: {
    message_text: string;
    conversation_id: string;
    sender_id: string;
  }): Promise<MessagePayload> => {
    return prisma.message.create({
      data: {
        message_text: data.message_text,
        conversation: { connect: { conversation_id: data.conversation_id } },
        sender: { connect: { user_id: data.sender_id } },
      },
    });
  },
};
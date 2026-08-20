import type {
  Conversation as PrismaConversation,
  Message as PrismaMessage,
  Product,
  User,
} from "../generated/prisma/client.ts";

export type Conversation = PrismaConversation;
export type Message = PrismaMessage;

export interface ConversationPayload {
  conversation_preview?: string;
  unread?: boolean;
  product_id: string;
  seller_id: string;
}

export interface MessagePayload {
  message_id?: string;
  message_text: string;
  conversation_id?: string;
  conversation?: Conversation;
  sender_id?: string;
  sender?: User;
}

import type {
  Conversation as PrismaConversation,
  Message as PrismaMessage,
  Product,
  User,
} from "../generated/prisma/client.ts";

export type Conversation = PrismaConversation;
export type Message = PrismaMessage;

export interface ConversationPayload {
  //   conversation_id: string;
  conversation_preview: string;
  unread: boolean;
  //   messages: Message[];
  seller_id: string;
  //   seller: User;
  product_id: string;
  //   product: Product;
}

export interface MessagePayload {
  message_id: string;
  message_text: string;
  conversation_id: string;
  conversation: Conversation;
  sender_id: string;
  sender: User;
}

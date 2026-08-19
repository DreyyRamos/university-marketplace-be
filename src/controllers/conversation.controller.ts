import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.ts";
import { conversationsServices } from "../services/conversation.service.ts";

export const conversationsController = {
  getAllConversation: async (req: AuthRequest, res: Response) => {
    const conversations = await conversationsServices.getAllConversation();
    res.json(conversations);
  },
  getConversationById: async (req: AuthRequest, res: Response) => {
    const convo_id = req.params.product_id as string;
    const conversation =
      await conversationsServices.getConversationById(convo_id);
    res.json(conversation);
  },
  startConversation: async (req: AuthRequest, res: Response) => {
    const sellerId = req.params.id as string;
    const buyerId = req.user!.id;

    if (buyerId === sellerId) {
      return res.status(400).json({ message: "Can't message yourself" });
    }

    const conversation = await conversationsServices.startConversation(
      { ...req.body, seller_id: sellerId },
      buyerId,
    );
    res.json(conversation);
  },
};
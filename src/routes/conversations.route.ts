import { Router } from "express";
import { conversationsController } from "../controllers/conversation.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import z from "zod/v3";

const router = Router();

export const createConversationSchema = z.object({
  product_id: z.string().cuid(),
  conversation_preview: z.string().optional(),
  unread: z.number().int().min(0).default(0).optional(),
});

export const updateConversationSchema = z.object({
  conversation_preview: z.string().optional(),
  unread: z.number().int().min(0).optional(),
});

export const getConversationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

router.get(
  "/",
  authMiddleware,
  asyncHandler(conversationsController.getAllConversation),
);
router.get(
  "/:id",
  authMiddleware,
  asyncHandler(conversationsController.getConversationById),
);
router.post(
  "/start/:id",
  authMiddleware,
  asyncHandler(conversationsController.startConversation),
);

export default router;

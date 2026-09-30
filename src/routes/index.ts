import { Router } from "express";
import userRoutes from "./users.routes.ts";
import productRoutes from "./products.route.ts";
import authRoutes from "./auth.route.ts";
import conversationRoutes from "./conversations.route.ts";
import adminRoutes from "./admin.route.ts";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/conversations", conversationRoutes);
router.use("/admin", adminRoutes);

export default router;

import { Router } from "express";
import userRoutes from "./users.routes.ts";
import productRoutes from "./products.route.ts";
import authRoutes from "./auth.route.ts";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/auth", authRoutes);

export default router;

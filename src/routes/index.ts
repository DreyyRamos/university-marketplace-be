import { Router } from "express";
import userRoutes from "./users.routes.ts";
import productRoutes from "./products.route.ts";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);

export default router;

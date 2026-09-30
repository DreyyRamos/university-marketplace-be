import { Router } from "express";
import { adminController } from "../controllers/admin.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.ts";

const router = Router();

router.use(authMiddleware);
router.use(requireRole("Admin"));

router.get("/stats", asyncHandler(adminController.getStats));
router.get("/users", asyncHandler(adminController.getAllUsers));
router.get("/products", asyncHandler(adminController.getAllProducts));
router.delete("/users/:id", asyncHandler(adminController.deleteUser));
router.delete("/products/:id", asyncHandler(adminController.deleteProduct));
router.patch("/users/:id/role", asyncHandler(adminController.updateUserRole));

export default router;

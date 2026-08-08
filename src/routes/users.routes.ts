import { Router } from "express";
import { usersController } from "../controllers/users.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.ts";
import { validate } from "../middleware/validate.middleware.ts";
import z from "zod/v3";

const router = Router();

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

router.get("/", authMiddleware, asyncHandler(usersController.getAll));
router.get("/:id", authMiddleware, asyncHandler(usersController.getById));
router.post(
  "/",
  validate(createUserSchema),
  asyncHandler(usersController.create),
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  asyncHandler(usersController.getById),
);

export default router;

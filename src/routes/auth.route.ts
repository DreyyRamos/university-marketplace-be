import { Router } from "express";
import { usersController } from "../controllers/users.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { validate } from "../middleware/validate.middleware.ts";
import z from "zod/v3";

const router = Router();

const createUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

router.post(
  "/register",
  validate(createUserSchema),
  asyncHandler(usersController.create),
);
// router.get("/:id",asyncHandler(usersController.getById));
// router.post(
//   "/",
//   validate(createUserSchema),
//   asyncHandler(usersController.create),
// );
// router.delete(
//   "/:id",
//   asyncHandler(usersController.getById),
// );

export default router;

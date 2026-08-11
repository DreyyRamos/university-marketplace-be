import { Router } from "express";
import { productsController } from "../controllers/products.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.ts";
import { validate } from "../middleware/validate.middleware.ts";
import { z } from "zod/v3";

const router = Router();

const createProductSchema = z.object({
  product_name: z.string().min(1),
  product_price: z.number(),
  product_image: z.string(),
  product_description: z.string().min(1),
  product_details: z.string().min(1),
  rating: z.number().optional(),
  condition: z.enum(["LIKE_NEW", "GOOD", "STILL_USABLE"]),
  location: z.string(),
});

// router.use(authMiddleware);

router.get("/", asyncHandler(productsController.getAllProducts));
router.get("/:product_id", asyncHandler(productsController.getProductById));
router.post(
  "/create",
  authMiddleware,
  validate(createProductSchema),
  asyncHandler(productsController.listAnItem),
);

export default router;

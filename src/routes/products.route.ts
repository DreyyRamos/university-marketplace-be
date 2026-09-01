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
  product_image: z.array(z.string()).optional(),
  product_description: z.string().min(1),
  product_details: z.string().optional(),
  rating: z.number().optional(),
  category: z.enum([
    "Electronics",
    "Books",
    "Furniture",
    "Clothing",
    "Sports",
    "Other",
  ]),
  condition: z.enum(["LIKE_NEW", "GOOD", "STILL_USABLE"]),
  location: z.string(),
});

const updateProductSchema = z.object({
  product_name: z.string().min(1).optional(),
  product_price: z.number().optional(),
  product_image: z.array(z.string()).optional(),
  product_description: z.string().min(1).optional(),
  product_details: z.string().optional(),
  rating: z.number().optional(),
  category: z
    .enum(["Electronics", "Books", "Furniture", "Clothing", "Sports", "Other"])
    .optional(),
  condition: z.enum(["LIKE_NEW", "GOOD", "STILL_USABLE"]).optional(),
  location: z.string().optional(),
});

// router.use(authMiddleware);

router.get("/", asyncHandler(productsController.getAllProducts));
router.post(
  "/create",
  authMiddleware,
  validate(createProductSchema),
  asyncHandler(productsController.listAnItem),
);
router.post(
  "/saveItem",
  authMiddleware,
  asyncHandler(productsController.saveItem),
);
router.get(
  "/saveItem",
  authMiddleware,
  asyncHandler(productsController.getAllSavedItems),
);
router.delete(
  "/saveItem/:product_id",
  authMiddleware,
  asyncHandler(productsController.removeSavedItem),
);
router.get("/:product_id", asyncHandler(productsController.getProductById));
router.patch(
  "/:product_id",
  authMiddleware,
  validate(updateProductSchema),
  asyncHandler(productsController.updateProduct),
);
router.delete(
  "/:product_id",
  authMiddleware,
  asyncHandler(productsController.deleteProduct),
);

export default router;

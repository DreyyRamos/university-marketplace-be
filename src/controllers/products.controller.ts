import type { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.ts";
import type { AuthRequest } from "../middleware/auth.middleware.ts";
import { productsServices } from "../services/products.service.ts";

export const productsController = {
  getAllProducts: async (req: Request, res: Response) => {
    const products = await productsServices.getAll();
    res.json(products);
  },
  getProductById: async (req: Request, res: Response) => {
    const product_id = req.params.product_id as string;
    const product = await productsServices.getById(product_id);
    res.json(product);
  },
  listAnItem: async (req: AuthRequest, res: Response) => {
    const sellerId = req.user!.id;
    const product = await productsServices.listAnItem(req.body, sellerId);
    res.status(201).json(product);
  },
  updateProduct: async (req: Request, res: Response) => {
    const product_id = req.params.product_id as string;
    const product = await productsServices.updateProduct(product_id, req.body);
    res.json(product);
  },
  deleteProduct: async (req: AuthRequest, res: Response) => {
    const product_id = req.params.product_id as string;
    const productToDelete = await productsServices.deleteProduct(product_id);
    res.json(productToDelete);
  },
  saveItem: async (req: AuthRequest, res: Response) => {
    const product_id = req.body.product_id;
    const userId = req.user!.id;

    if (!product_id || typeof product_id !== "string") {
      throw new ApiError(400, "product_id is required.");
    }

    const saveItem = await productsServices.saveItem(userId, product_id);
    res.status(200).json(saveItem);
  },
  getAllSavedItems: async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const savedItems = await productsServices.getAllSaved(userId);
    res.json(savedItems);
  },
  removeSavedItem: async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const product_id = req.params.product_id as string;

    if (!product_id) {
      throw new ApiError(400, "product_id is required.");
    }

    await productsServices.removeSaved(userId, product_id);
    res.status(204).json({ message: "Saved item removed." });
  },
};

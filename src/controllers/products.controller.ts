import type { Request, Response } from "express";
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
};

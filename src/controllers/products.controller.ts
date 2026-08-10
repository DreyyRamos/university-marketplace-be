import type { Request, Response } from "express";
import { productsServices } from "../services/products.service.ts";

export const productsController = {
  getAllProducts: async (req: Request, res: Response) => {
    const products = await productsServices.getAll();
    res.json(products);
  },
  getProductById: async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = await productsServices.getById(id);
    res.json(product);
  },
  listAnItem: async (req: Request, res: Response) => {
    const product = await productsServices.listAnItem(req.body);
    res.status(201).json(product);
  },
};

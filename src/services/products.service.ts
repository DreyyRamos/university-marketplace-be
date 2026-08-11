import { ProductModel } from "../models/product.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import type { CreateProductPayload } from "../types/product.types.ts";
import type { Product } from "../generated/prisma/client.ts";

export const productsServices = {
  getAll: async (): Promise<Product[]> => {
    const products = await ProductModel.findAll();
    return products;
  },
  getById: async (id: string): Promise<Product> => {
    const product = await ProductModel.findById(id);
    if (!product) throw new ApiError(404, "No product found");
    return product;
  },
  listAnItem: async (
    payload: CreateProductPayload,
    sellerId: string,
  ): Promise<Product> => {
    const product = await ProductModel.listAnItem({
      ...payload,
      rating: 0,
      seller_id: sellerId,
    });

    return product;
  },
};

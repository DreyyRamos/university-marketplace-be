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
  listAnItem: async (payload: CreateProductPayload): Promise<Product> => {
    const product = await ProductModel.createProduct({
      product_name: payload.product_name,
      product_price: payload.product_price,
      product_image: payload.product_image,
      product_description: payload.product_description,
      product_details: payload.product_details,
      rating: payload.rating,
      condition: payload.condition,
      location: payload.location,
    });

    return product;
  },
};

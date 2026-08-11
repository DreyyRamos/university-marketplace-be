import { prisma } from "../lib/prisma.ts";
import type { Product } from "../generated/prisma/client.ts";

export const ProductModel = {
  findAll: async (): Promise<Product[]> => {
    return prisma.product.findMany();
  },
  findById: async (product_id: string): Promise<Product | null> => {
    return prisma.product.findUnique({ where: { product_id } });
  },
  listAnItem: async (
    data: Omit<Product, "product_id" | "createdAt" | "updatedAt" | "seller">,
  ): Promise<Product> => {
    return prisma.product.create({ data });
  },
};

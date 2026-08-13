import { prisma } from "../lib/prisma.ts";
import type { Product } from "../types/product.types.ts";

export const ProductModel = {
  findAll: async (): Promise<Product[]> => {
    return prisma.product.findMany({
      include: {
        seller: {
          select: {
            user_id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            user_rating: true,
            profile_image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  },
  findById: async (product_id: string): Promise<Product | null> => {
    return prisma.product.findUnique({
      where: { product_id: product_id },
      include: {
        seller: {
          select: {
            user_id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            user_rating: true,
            profile_image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  },
  listAnItem: async (
    data: Omit<Product, "product_id" | "createdAt" | "updatedAt" | "seller">,
  ): Promise<Product> => {
    return prisma.product.create({ data });
  },
};

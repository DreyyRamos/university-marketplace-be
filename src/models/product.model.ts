import { prisma } from "../lib/prisma.ts";
import type { Product, UpdateProductPayload } from "../types/product.types.ts";

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
  updateListing: async (
    data: Omit<UpdateProductPayload, "product_id">,
    product_id: string,
  ): Promise<Product> => {
    return prisma.product.update({
      where: { product_id },
      data: data as Parameters<typeof prisma.product.update>[0]["data"],
    });
  },
  deleteListing: async (product_id: string): Promise<Product> => {
    return prisma.product.delete({ where: { product_id } });
  },
  saveItem: async (userId: string, productId: string, qty = 1) => {
    return prisma.savedItems.upsert({
      where: { user_id_product_id: { user_id: userId, product_id: productId } },
      update: { quantity: { increment: qty } },
      create: { user_id: userId, product_id: productId, quantity: qty },
      include: { product: true },
    });
  },
  findAllSavedItems: async (userId: string) => {
    return prisma.savedItems.findMany({
      where: { user_id: userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
  },
  removeSavedItem: async (userId: string, productId: string) => {
    return prisma.savedItems.delete({
      where: { user_id_product_id: { user_id: userId, product_id: productId } },
    });
  },
};

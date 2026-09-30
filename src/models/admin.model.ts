import { prisma } from "../lib/prisma.ts";

export const AdminModel = {
  getStats: async () => {
    const [totalUsers, totalProducts, totalConversations, activeListings] =
      await Promise.all([
        prisma.user.count(),
        prisma.product.count(),
        prisma.conversation.count(),
        prisma.product.count({ where: { product_status: "Active" } }),
      ]);

    return {
      totalUsers,
      totalProducts,
      totalConversations,
      activeListings,
    };
  },

  getAllUsers: async () => {
    return prisma.user.findMany({
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
        _count: {
          select: { products_listed: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  getAllProducts: async () => {
    return prisma.product.findMany({
      include: {
        seller: {
          select: {
            user_id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  deleteUser: async (userId: string) => {
    return prisma.user.delete({ where: { user_id: userId } });
  },

  deleteProduct: async (productId: string) => {
    return prisma.product.delete({ where: { product_id: productId } });
  },

  updateUserRole: async (userId: string, role: "Student" | "Admin") => {
    return prisma.user.update({
      where: { user_id: userId },
      data: { role },
    });
  },
};

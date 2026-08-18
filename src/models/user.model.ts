import { prisma } from "../lib/prisma.ts";
import type { User } from "../types/user.types.ts";

export const UserModel = {
  findAll: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },
  findById: async (id: string): Promise<User | undefined> => {
    const user = await prisma.user.findUnique({ where: { user_id: id } });
    return user ?? undefined;
  },
  findByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email: email } });
  },
  createUser: async (data: Omit<User, "user_id">): Promise<User> => {
    const user = await prisma.user.create({
      data: data,
    });
    return user;
  },
  currentUser: async (currentUserId: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { user_id: currentUserId },
      include: { products_listed: true, conversations: true, messages: true },
    });
  },
  getUserListings: async (currentUserId: string) => {
    return await prisma.user.findUnique({
      where: { user_id: currentUserId },
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
        products_listed: true,
      },
    });
  },
};

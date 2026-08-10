import { prisma } from "../lib/prisma.ts";
import type { User } from "../generated/prisma/client.ts";

export const UserModel = {
  findAll: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },
  findById: async (id: string): Promise<User | undefined> => {
    const user = await prisma.user.findUnique({ where: { user_id: id } });
    return user ?? undefined;
  },
  findByClerkId: async (clerkId: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { user_clerkId: clerkId } });
  },
  findByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email: email } });
  },
  create: async (
    data: Omit<User, "user_id" | "createdAt" | "updatedAt">,
  ): Promise<User> => {
    return prisma.user.create({ data });
  },
};

import { prisma } from "../lib/prisma.ts";
import type { User, CreateUserPayload } from "../types/user.types.ts";

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
};

import type { User } from "../types/user.types.ts";

const users: User[] = [];

export const UserModel = {
  findAll: async (): Promise<User[]> => users,
  findById: async (id: string): Promise<User | undefined> =>
    users.find((u) => u.id === id),
  findByEmail: async (email: string): Promise<User | undefined> =>
    users.find((u) => u.email === email),
  create: async (data: Omit<User, "id" | "createdAt">): Promise<User> => {
    const user: User = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    users.push(user);
    return user;
  },
};

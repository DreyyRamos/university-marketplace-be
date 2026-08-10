import type { User as PrismaUser } from "../generated/prisma/client.ts";

export type User = PrismaUser;
export type SafeUser = Omit<User, "user_clerkId">;

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

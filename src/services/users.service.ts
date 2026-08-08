import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import type { CreateUserPayload, SafeUser } from "../types/user.types.ts";

function toSafeUSer(user: any): SafeUser {
  const { password, ...safe } = user;
  return user;
}

export const usersService = {
  getAll: async (): Promise<SafeUser[]> => {
    const users = await UserModel.findAll();
    return users.map(toSafeUSer);
  },

  getById: async (id: string): Promise<SafeUser> => {
    const user = await UserModel.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return toSafeUSer(user);
  },

  create: async (payload: CreateUserPayload): Promise<SafeUser> => {
    const existingUser = await UserModel.findByEmail(payload.email);

    if (existingUser) throw new ApiError(409, "Email already exist");

    const hashed = await bcrypt.hash(payload.password, 10);
    const user = await UserModel.create({
      ...payload,
      password: hashed,
      role: "student",
    });
    return toSafeUSer(user);
  },
};

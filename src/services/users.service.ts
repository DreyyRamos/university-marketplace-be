import { UserModel } from "../models/user.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import type { CreateUserPayload, SafeUser, User } from "../types/user.types.ts";

export const usersService = {
  getAll: async (): Promise<SafeUser[]> => {
    return await UserModel.findAll();
  },

  getById: async (id: string): Promise<SafeUser> => {
    const user = await UserModel.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  },
};
